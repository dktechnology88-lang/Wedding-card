// URL se mehmaan ka naam nikalna (?to=GuestName)
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');

    if (guestName) {
        const formattedName = decodeURIComponent(guestName);
        document.getElementById("guest-name-display").innerText = "Dear " + formattedName + ",";
        document.getElementById("guest-welcome-box").classList.remove("hidden");
    }
});

// Envelope Opening Function
function openEnvelope() {
    const wrapper = document.getElementById("envelope-wrapper");
    const mainContent = document.getElementById("main-content");
    const audio = document.getElementById("bg-music");

    // 1. Envelope animation start
    wrapper.classList.add("open");

    // 2. Play Background Music
    if (audio) {
        audio.play().then(() => {
            document.getElementById("audio-icon").innerText = "❚❚";
        }).catch(() => {
            console.log("Audio play blocked by browser.");
        });
    }

    // 3. Envelope fade out and show main website
    setTimeout(() => {
        wrapper.classList.add("fade-out");
        setTimeout(() => {
            wrapper.style.display = "none";
            mainContent.classList.remove("hidden");
        }, 800);
    }, 1200);
}

// Audio Toggle (Play / Pause)
function toggleAudio() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("audio-icon");

    if (audio.paused) {
        audio.play();
        icon.innerText = "❚❚";
    } else {
        audio.pause();
        icon.innerText = "▶";
    }
}

// WhatsApp Share
function shareOnWhatsApp() {
    const url = window.location.href;
    const text = `You are cordially invited to the wedding of Ajaz & Haram! ✦\n\nClick to view invitation:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

// TOUCH / CLICK SPARKLE STAR EFFECT
document.addEventListener("click", function (e) {
    createSparkle(e.clientX, e.clientY);
});

document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 0) {
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
