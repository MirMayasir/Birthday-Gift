/* =====================================================
   Birthday Gift Website — script.js
===================================================== */

// ─── Helpers ──────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const rand = (min, max) => Math.random() * (max - min) + min;

// ─── 1. Floating hearts on landing ────────────────────
(function spawnHearts() {
  const container = $('#hearts-bg');
  const emojis = ['💖', '💗', '💓', '💝', '❤️', '🌸', '✨'];

  function createHeart() {
    const el = document.createElement('span');
    el.classList.add('heart-particle');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = rand(0, 100) + 'vw';
    el.style.fontSize = rand(1, 2.5) + 'rem';
    const duration = rand(6, 14);
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = rand(0, 6) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + 6) * 1000);
  }

  // Create initial batch
  for (let i = 0; i < 30; i++) createHeart();
  // Keep spawning
  setInterval(createHeart, 600);
})();

// ─── 2. Landing page: button redirects to gift.html ───
function openGift() {
  const landing = $('#landing');
  if (landing) {
    landing.style.transition = 'opacity .8s ease';
    landing.style.opacity = '0';
    setTimeout(() => { window.location.href = 'gift.html'; }, 800);
  }
}

// ─── 2b. Gift page: auto-start everything on load ─────
if (!$('#landing')) {
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('loaded'));
    launchConfetti();
    startCountdown();
    launchBalloons();
    initScrollAnimations();
  });
}

// ─── 3. Confetti ──────────────────────────────────────
function launchConfetti() {
  const container = $('#confetti-container');
  const colors = ['#ff6b9d', '#ffd700', '#ff4d79', '#c96fd6', '#fff', '#ffb3cc'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = rand(0, 100) + 'vw';
    piece.style.backgroundColor = colors[Math.floor(rand(0, colors.length))];
    const size = rand(6, 14);
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    const duration = rand(2, 5);
    piece.style.animationDuration = duration + 's';
    piece.style.animationDelay = rand(0, 3) + 's';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + 3) * 1000);
  }
}

// ─── 4. Countdown to next birthday (April 3, 2027) ────
function startCountdown() {
  const next = new Date('2027-04-04T00:00:00');

  function tick() {
    const now  = new Date();
    const diff = next - now;
    if (diff <= 0) {
      $('#cd-days').textContent  = '000';
      $('#cd-hours').textContent = '00';
      $('#cd-mins').textContent  = '00';
      $('#cd-secs').textContent  = '00';
      return;
    }

    const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s  = Math.floor((diff % (1000 * 60)) / 1000);

    $('#cd-days').textContent  = String(d).padStart(3, '0');
    $('#cd-hours').textContent = String(h).padStart(2, '0');
    $('#cd-mins').textContent  = String(m).padStart(2, '0');
    $('#cd-secs').textContent  = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

// ─── 5. Balloons ──────────────────────────────────────
function launchBalloons() {
  const container = $('#balloons');
  const balloonEmojis = ['🎈', '🎀', '🎊', '🎉', '💜', '🩷'];

  function createBalloon() {
    const el = document.createElement('span');
    el.classList.add('balloon');
    el.textContent = balloonEmojis[Math.floor(rand(0, balloonEmojis.length))];
    el.style.left = rand(2, 95) + 'vw';
    el.style.fontSize = rand(1.8, 3.2) + 'rem';
    const duration = rand(8, 16);
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = rand(0, 8) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + 8) * 1000);
  }

  // Launch a few balloons
  for (let i = 0; i < 12; i++) createBalloon();
  setInterval(createBalloon, 2500);
}

// ─── 6. Scroll-triggered animations ───────────────────
function initScrollAnimations() {
  const targets = document.querySelectorAll('.reason-card, .timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((t) => observer.observe(t));
}

// ─── 7. Sparkle cursor trail ──────────────────────────
(function sparkleCursor() {
  const sparkles = ['✨', '💖', '⭐', '🌸', '💫'];
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.35) return; // only fire ~65% of moves
    const el = document.createElement('span');
    el.textContent = sparkles[Math.floor(rand(0, sparkles.length))];
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top:  ${e.clientY}px;
      pointer-events: none;
      font-size: ${rand(0.8, 1.6)}rem;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.8s ease, transform 0.8s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '0';
        el.style.transform = `translate(-50%, calc(-50% - ${rand(30, 70)}px))`;
      });
    });
    setTimeout(() => el.remove(), 900);
  });
})();
