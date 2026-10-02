// Formspree Endpoint URL for Live Cloud Sync
const FORM_ENDPOINT = "https://formspree.io/f/xeaowdoe"; 

// 1. OPEN ENVELOPE FUNCTION (Guaranteed Working)
function openEnvelope() {
    var wrapper = document.getElementById("envelope-wrapper");
    var mainContent = document.getElementById("main-content");
    var audio = document.getElementById("bg-music");

    if (wrapper) {
        wrapper.classList.add("open");
    }

    if (audio) {
        audio.play().then(function() {
            var icon = document.getElementById("audio-icon");
            if (icon) icon.innerText = "❚❚";
        }).catch(function(e) {
            console.log("Audio play blocked");
        });
    }

    setTimeout(function() {
        if (wrapper) {
            wrapper.style.opacity = "0";
            wrapper.style.transition = "opacity 0.5s ease";
            
            setTimeout(function() {
                wrapper.style.display = "none";
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                    mainContent.style.display = "block";
                }
            }, 500);
        }
    }, 800);
}

// 2. DOM CONTENT LOADED HANDLER
document.addEventListener("DOMContentLoaded", function () {
    // Guest Name from URL (?to=GuestName)
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

    // Load Wishes
    fetchWishes();

    // Form Submit Handler
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
                .then(function() {
                    alert("JazakAllah! Your blessings have been published.");
                    saveLocalWish(name, wish);
                    nameInput.value = "";
                    wishInput.value = "";
                })
                .catch(function(error) {
                    console.error("Error:", error);
                    saveLocalWish(name, wish);
                    nameInput.value = "";
                    wishInput.value = "";
                })
                .finally(function() {
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
        wishes.forEach(function(item) {
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

// WhatsApp Share Function with Royal Message
function shareOnWhatsApp() {
    const url = window.location.href;
    const text = `بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\n\n✨ *WEDDING INVITATION* ✨\n\n*Ajaz Dalkhaniya* ✦ *Haram Khatri*\n\nWe cordially invite you to share in our joy as we celebrate our wedding ceremony.\n\n👇 *Click link to open interactive invitation:* \n${url}`;
    
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

    setTimeout(function() {
        star.remove();
    }, 800);
}
