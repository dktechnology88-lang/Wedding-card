Script.js
// Background Audio Play/Pause Toggle
function toggleAudio() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("audio-icon");
    if (audio.paused) {
        audio.play();
        icon.textContent = "🔊";
    } else {
        audio.pause();
        icon.textContent = "🎵";
    }
}

// RSVP Selection Handler
function selectRSVP(element) {
    const btns = document.querySelectorAll('.choice-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

// RSVP Form Submit Handler
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    alert(`Thank you ${name}! Your response has been recorded.`);
    document.getElementById('guestName').value = '';
});

// Dynamic Wishes Wall
document.getElementById('wishForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const author = document.getElementById('wishAuthor').value;
    const wishText = document.getElementById('wishMessage').value;

    if (wishText.trim() !== '' && author.trim() !== '') {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `<h5>${author}</h5><p>"${wishText}"</p>`;
        document.getElementById('wishesContainer').prepend(wishCard);

        document.getElementById('wishAuthor').value = '';
        document.getElementById('wishMessage').value = '';
    }
});
