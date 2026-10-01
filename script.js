// Formspree Endpoint URL for Cloud Recording
const FORM_ENDPOINT = "https://formspree.io/f/xeaowdoe"; 

document.addEventListener("DOMContentLoaded", function () {
    // 1. Guest Name from URL (?to=GuestName)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('guest');

    if (guestName) {
        const formattedName = decodeURIComponent(guestName);
        const nameDisplay = document.getElementById("guest-name-display");
        const welcomeBox = document.getElementById("guest-welcome-box");
        if (nameDisplay && welcomeBox) {
            nameDisplay.innerText = "Dear " + formattedName + ",";
            welcomeBox.classList.remove("hidden");
            welcomeBox.style.display = "block";
        }
    }

    // Load Local & Session Wishes
    fetchWishes();

    // 2. RSVP Form Submission
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('guestName');
            const wishInput = document.getElementById('wishMessage');
            const submitBtn = document.getElementById('submitBtn');

            const name = nameInput.value.trim();
            const wish = wishInput.value.trim();

            if (name && wish) {
                submitBtn.disabled = true;
                submitBtn.innerText = "SENDING...";

                // Submit to Formspree Cloud
                fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ name: name, message: wish })
                })
                .then(response => {
                    alert("JazakAllah! Your blessings have been published.");
                    saveLocalWish(name, wish);
                    nameInput.value = "";
                    wishInput.value = "";
                })
                .catch(error => {
                    console.error("Formspree Error:", error);
                    // Still save locally so guest sees their wish immediately
                    saveLocalWish(name, wish);
                    nameInput.value = "";
                    wishInput.value = "";
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "SEND BLESSINGS";
                });
            }
        });
    }
});

// Save Wish Locally & Refresh View
function saveLocalWish(name, message) {
    let wishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
    wishes.unshift({ name: name, message: message });
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    fetchWishes();
}

// Display Wishes on Website
function fetchWishes() {
    const wishesList = document.getElementById('wishes-list');
    if (!wishesList) return;

    let wishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];

    if (wishes.length > 0) {
        wishesList.innerHTML = "";
        wishes.forEach(item => {
            const wishCard = document.createElement('div');
            wishCard.className = 'single-wish-card';
            wishCard.innerHTML = `
                <p class="wish-author">${escapeHtml(item.name)}</p>
                <p class="wish-message">"${escapeHtml(item.message)}"</p>
            `;
            wishesList.appendChild(wishCard);
        });
    } else {
        wishesList.innerHTML = `<p class="no-wishes">Be the first to leave blessings for Ajaz & Haram!</p>`;
    }
}

// Security Escape HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Envelope Opening Function
function openEnvelope() {
    const wrapper = document.getElementById("envelope-wrapper");
    const mainContent = document.getElementById("main-content");
    const audio = document.getElementById("bg-music");

    if (wrapper) wrapper.classList.add("open");

    if (audio) {
        audio.play().then(() => {
            const icon = document.getElementById("audio-icon");
            if (icon) icon.innerText = "❚❚";
        }).catch(() => {
            console.log("Audio play deferred");
        });
    }

    setTimeout(() => {
        if (wrapper) {
            wrapper.style.opacity = "0";
            wrapper.style.transition = "opacity 0.5s ease";
            
            setTimeout(() => {
                wrapper.style.display = "none";
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                    mainContent.style.display = "block";
                }
            }, 500);
        }
    }, 800);
}

// Audio Toggle
function toggleAudio() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("audio-icon");

    if (audio) {
        if (audio.paused) {
            audio.play();
            if (icon) icon.innerText = "❚❚";
        } else {
            audio.pause();
            if (icon) icon.innerText = "▶";
        }
    }
}

// WhatsApp Share Function
function shareOnWhatsApp() {
    const url = window.location.href;
    const text = `You are cordially invited to the wedding of Ajaz & Haram! ✦\n\nClick to view invitation:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

// Touch Sparkle Effect
document.addEventListener("click", function (e) {
    createSparkle(e.clientX, e.clientY);
});

document.addEventListener("touchstart", function (e) {
    if (e.touches && e.touches.length > 0) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
});

function createSparkle(x, y) {
    const star = document.createElement("div");
    star.className = "sparkle-star";
    star.innerHTML = "✦";
    star.style.left = x + "px";
    star.style.top = y + "px";

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 800);
}
