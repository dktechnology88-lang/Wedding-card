// Envelope Click & Music Auto-Play
function openEnvelope() {
    const envScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('audio-icon');

    envScreen.classList.add('open-anim');

    setTimeout(() => {
        envScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Play audio on opening
        audio.play().then(() => {
            icon.textContent = "❚❚";
        }).catch(() => {
            console.log("Audio play blocked by browser");
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

// RSVP Form
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your blessings have been sent.');
    document.getElementById('guestName').value = '';
    document.getElementById('wishMessage').value = '';
});
