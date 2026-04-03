/* =====================================================
   index.js  —  Landing page only
===================================================== */

const rand = (min, max) => Math.random() * (max - min) + min;

// ─── Floating hearts ──────────────────────────────────
(function spawnHearts() {
  const container = document.getElementById('hearts-bg');
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

  for (let i = 0; i < 30; i++) createHeart();
  setInterval(createHeart, 600);
})();

// ─── Open Gift button: fade out → go to gift page ────
function openGift() {
  const landing = document.getElementById('landing');
  landing.style.transition = 'opacity .8s ease';
  landing.style.opacity = '0';
  setTimeout(() => { window.location.href = 'gift.html'; }, 800);
}

// ─── Sparkle cursor trail ─────────────────────────────
(function sparkleCursor() {
  const sparkles = ['✨', '💖', '⭐', '🌸', '💫'];
  const rand = (min, max) => Math.random() * (max - min) + min;
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.35) return;
    const el = document.createElement('span');
    el.textContent = sparkles[Math.floor(rand(0, sparkles.length))];
    el.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      pointer-events:none;font-size:${rand(0.8,1.6)}rem;
      z-index:9999;opacity:1;
      transition:opacity .8s ease,transform .8s ease;
      transform:translate(-50%,-50%);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '0';
      el.style.transform = `translate(-50%,calc(-50% - ${rand(30,70)}px))`;
    }));
    setTimeout(() => el.remove(), 900);
  });
})();
