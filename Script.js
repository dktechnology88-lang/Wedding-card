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
// Floating Golden Stars Effect Generator
function createStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = '100vh';
    star.style.width = Math.random() * 3 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.backgroundColor = '#e2c478';
    star.style.borderRadius = '50%';
    star.style.boxShadow = '0 0 10px #e2c478';
    star.style.zIndex = '1';
    star.style.opacity = Math.random();
    
    document.body.appendChild(star);

    let duration = Math.random() * 3 + 3;
    star.style.transition = `transform ${duration}s linear, opacity ${duration}s ease`;
    
    setTimeout(() => {
        star.style.transform = `translateY(-105vh)`;
        star.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

setInterval(createStar, 300);
