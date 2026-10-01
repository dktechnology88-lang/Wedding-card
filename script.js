// Firebase Realtime Database Integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Public Firebase Database Configuration
const firebaseConfig = {
    databaseURL: "https://wedding-invitation-wishes-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const wishesRef = ref(database, 'wishes');

// 1. URL se Guest Name Read karna (?to=GuestName)
document.addEventListener("DOMContentLoaded", function () {
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

    // Load Wishes from Live Database
    loadWishes();
});

// 2. Wishes Form Submission Handler
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

            push(wishesRef, {
                name: name,
                message: wish,
                timestamp: Date.now()
            }).then(() => {
                alert("JazakAllah! Your blessings have been published on the website.");
                nameInput.value = "";
                wishInput.value = "";
                submitBtn.disabled = false;
                submitBtn.innerText = "SEND BLESSINGS";
            }).catch((error) => {
                console.error("Error saving wish:", error);
                alert("Something went wrong. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = "SEND BLESSINGS";
            });
        }
    });
}

// 3. Load & Display Live Wishes
function loadWishes() {
    const wishesList = document.getElementById('wishes-list');
    
    onValue(wishesRef, (snapshot) => {
        if (!wishesList) return;
        
        wishesList.innerHTML = "";
        const data = snapshot.val();

        if (data) {
            const wishesArray = Object.values(data).reverse();
            
            wishesArray.forEach(item => {
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
    });
}

// Security Helper to prevent HTML Injection
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 4. Envelope Opening Function
window.openEnvelope = function () {
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
};

// 5. Audio Play/Pause Control
window.toggleAudio = function () {
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
};

// 6. WhatsApp Share Function
window.shareOnWhatsApp = function () {
    const url = window.location.href;
    const text = `You are cordially invited to the wedding of Ajaz & Haram! ✦\n\nClick to view invitation:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
};

// 7. Touch/Click Sparkle Star Effect
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
