// URL se Guest ka Name Read karna (?guest=Faisal)
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');

    if (guestName) {
        const formattedName = decodeURIComponent(guestName);
        document.getElementById('guest-name-display').innerText = formattedName;
        document.getElementById('guest-welcome-box').classList.remove('hidden');
        document.getElementById('guest-greeting-envelope').innerText = `Dear ${formattedName}`;
    }
});

// Envelope Opening Screen & Music Play
function openEnvelope() {
    const envScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('audio-icon');

    envScreen.classList.add('open-anim');

    setTimeout(() => {
        envScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        audio.play().then(() => {
            icon.textContent = "❚❚";
        }).catch(() => {
            console.log("Audio play blocked by browser policy");
        });
    }, 700);
}

// Audio Toggle Button
function toggleAudio() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("audio-icon");
    if (audio.paused) {
        audio.play();
        icon.textContent = "❚❚";
    } else {
        audio.pause();
        icon.textContent = "▶";
    }
}

// WhatsApp Share Functionality
function shareOnWhatsApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentGuest = urlParams.get('guest') || '';
    
    let shareText = `✨ *WEDDING INVITATION* ✨\n\n`;
    if(currentGuest) {
        shareText += `Dear *${decodeURIComponent(currentGuest)}*,\n\n`;
    }
    shareText += `We cordially invite you to celebrate the wedding of\n*Ajaz Dalkhaniya* ✦ weds ✦ *Haram Khatri*\n\n📅 *Nikah:* Saturday, 10 October 2026 (Mumbai)\n📅 *Dawat-e-Walima:* Tuesday, 13 October 2026 (Vapi)\n\nView your personal invitation here:\n👇\n${window.location.href}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
}

// RSVP Form
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your blessings have been sent.');
    document.getElementById('guestName').value = '';
    document.getElementById('wishMessage').value = '';
});
