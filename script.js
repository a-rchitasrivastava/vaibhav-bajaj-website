/* ============================================================
   SCRIPT.JS — All interactive logic for the birthday website
   ============================================================ */

'use strict';

/* ── Utility ──────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);
const qsa = sel => document.querySelectorAll(sel);

/* ══════════════════════════════════════════════════════════
   1. FLOATING HEARTS
══════════════════════════════════════════════════════════ */
(function initFloatingHearts() {
  const container = $('floating-hearts');
  const symbols = ['❤️', '💕', '💗', '💓', '💖', '🌸', '💞', '💝'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 98}%`;
    el.style.fontSize = `${0.6 + Math.random() * 1}rem`;
    const dur = 7 + Math.random() * 10;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
  }

  // Spawn initial batch
  for (let i = 0; i < 15; i++) setTimeout(spawnHeart, Math.random() * 3000);
  // Keep spawning
  setInterval(spawnHeart, 1800);
})();


/* ══════════════════════════════════════════════════════════
   2. MUSIC PLAYER
══════════════════════════════════════════════════════════ */
(function initMusic() {
  const audio    = $('bg-music');
  const toggleBtn = $('music-toggle');
  const icon     = $('music-icon');
  const label    = $('music-label');
  let   playing  = false;
  let   canPlay  = false;

  // Set source from content.js
  if (typeof MUSIC_FILE !== 'undefined') {
    audio.src = MUSIC_FILE;
  }

  // Test if file is loadable
  audio.addEventListener('canplaythrough', () => { canPlay = true; });
  audio.addEventListener('error', () => {
    label.textContent = 'No song yet';
    toggleBtn.style.opacity = '0.6';
    canPlay = false;
  });

  toggleBtn.addEventListener('click', () => {
    if (!canPlay) return;
    if (playing) {
      audio.pause();
      icon.textContent = '▶';
      label.textContent = 'Our Song';
      playing = false;
    } else {
      audio.play().then(() => {
        icon.textContent = '⏸';
        label.textContent = 'Playing ♪';
        playing = true;
      }).catch(() => {
        label.textContent = 'No song yet';
      });
    }
  });

  // Attempt to play on first user interaction (auto-play policy)
  let triedAuto = false;
  document.addEventListener('click', function firstClick() {
    if (!triedAuto && canPlay && !playing) {
      triedAuto = true;
      audio.play().then(() => {
        icon.textContent = '⏸';
        label.textContent = 'Playing ♪';
        playing = true;
      }).catch(() => {});
    }
    document.removeEventListener('click', firstClick);
  }, { once: false });
})();


/* ══════════════════════════════════════════════════════════
   3. WELCOME → OPEN SURPRISE
══════════════════════════════════════════════════════════ */
$('open-surprise-btn').addEventListener('click', () => {
  const welcome = $('welcome');
  const main    = $('main-content');

  welcome.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  welcome.style.opacity    = '0';
  welcome.style.transform  = 'scale(0.95)';

  setTimeout(() => {
    welcome.style.display = 'none';
    main.style.display    = 'block';
    main.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initRevealObserver();
  }, 600);
});


/* ══════════════════════════════════════════════════════════
   4. NAV — HAMBURGER
══════════════════════════════════════════════════════════ */
$('nav-hamburger').addEventListener('click', function() {
  const links   = $('nav-links');
  const isOpen  = links.classList.toggle('open');
  this.setAttribute('aria-expanded', isOpen);
});

// Close nav when link is clicked
$('nav-links').querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    $('nav-links').classList.remove('open');
    $('nav-hamburger').setAttribute('aria-expanded', 'false');
  });
});


/* ══════════════════════════════════════════════════════════
   5. RELATIONSHIP COUNTER
══════════════════════════════════════════════════════════ */
(function initCounter() {
  const startDate = typeof RELATIONSHIP_START !== 'undefined'
    ? RELATIONSHIP_START
    : new Date("2025-09-07T00:00:00");

  const days  = $('cnt-days');
  const hours = $('cnt-hours');
  const mins  = $('cnt-mins');
  const secs  = $('cnt-secs');

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function animateNum(el, newVal) {
    const old = el.textContent;
    if (old !== newVal) {
      el.style.transform = 'scale(1.2)';
      el.style.color     = '#b32454';
      el.textContent     = newVal;
      setTimeout(() => {
        el.style.transform = '';
        el.style.color     = '';
      }, 200);
    }
  }

  function update() {
    const now   = new Date();
    const diff  = Math.max(0, now - startDate);
    const totalSecs = Math.floor(diff / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    animateNum(days,  String(d));
    animateNum(hours, pad(h));
    animateNum(mins,  pad(m));
    animateNum(secs,  pad(s));
  }

  update();
  setInterval(update, 1000);
})();


/* ══════════════════════════════════════════════════════════
   6. QUIZ
══════════════════════════════════════════════════════════ */
(function initQuiz() {
  const questions   = typeof QUIZ_QUESTIONS !== 'undefined' ? QUIZ_QUESTIONS : [];
  const total       = questions.length;
  let   current     = 0;
  let   score       = 0;
  let   answered    = false;

  const progressBar  = $('quiz-progress');
  const progressText = $('quiz-progress-text');
  const quizCard     = $('quiz-card');
  const emojiEl      = $('quiz-emoji');
  const questionEl   = $('quiz-question');
  const optionsEl    = $('quiz-options');
  const feedbackEl   = $('quiz-feedback');
  const feedbackIcon = $('quiz-feedback-icon');
  const feedbackText = $('quiz-feedback-text');
  const resultEl     = $('quiz-result');
  const resultEmoji  = $('result-emoji');
  const resultHeading= $('result-heading');
  const resultScore  = $('result-score');
  const resultMsg    = $('result-msg');
  const funNoteEl    = $('quiz-fun-note');

  const correctMessages = [
    "Yessss! You know me so well! 💕",
    "Absolutely right! My smart Suar! 🐷❤️",
    "Correct! You were paying attention! 🌸",
    "That's right! I'm so impressed! ✨",
    "Perfect answer! You really know me! 💗"
  ];

  const incorrectMessages = [
    "Oops! Wrong answer, but I still love you! 😂💕",
    "Not quite! Pay more attention, Suar! 🐷",
    "Hmm, wrong! We clearly need more dates! 😄",
    "Incorrect! But you're still my favourite person. 🌸",
    "Nooo! We need to talk more! 😂❤️"
  ];

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function renderQuestion() {
    if (current >= total) { showResult(); return; }

    answered = false;
    feedbackEl.classList.add('hidden');

    const q = questions[current];
    const pct = (current / total) * 100;
    progressBar.style.width = `${pct}%`;
    progressText.textContent = `Question ${current + 1} of ${total}`;

    // Animate card in
    quizCard.style.animation = 'none';
    void quizCard.offsetHeight;
    quizCard.style.animation = 'cardIn 0.4s ease both';

    emojiEl.textContent      = q.emoji || '🌸';
    questionEl.textContent   = q.question;

    if (q.funNote) {
      funNoteEl.textContent = q.funNote;
      funNoteEl.classList.remove('hidden');
    } else {
      funNoteEl.classList.add('hidden');
    }

    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className  = 'quiz-option-btn';
      btn.textContent = opt;
      btn.setAttribute('aria-label', `Option: ${opt}`);
      btn.addEventListener('click', () => handleAnswer(idx, btn, q));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIdx, btn, q) {
    if (answered) return;
    answered = true;

    const allBtns = optionsEl.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => { b.disabled = true; });

    const isCorrect = selectedIdx === q.correctIndex;
    if (isCorrect) score++;

    // Mark correct answer
    allBtns[q.correctIndex].classList.add('correct');
    if (!isCorrect) btn.classList.add('incorrect');

    // Show feedback
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
      feedbackIcon.textContent = '✅';
      feedbackText.textContent = rand(correctMessages);
      feedbackEl.style.background = '#d4edda';
      feedbackEl.style.borderColor = '#28a745';
    } else {
      feedbackIcon.textContent = '❌';
      feedbackText.textContent = rand(incorrectMessages);
      feedbackEl.style.background = '#f8d7da';
      feedbackEl.style.borderColor = '#dc3545';
    }

    // Auto-advance after delay
    setTimeout(() => {
      current++;
      renderQuestion();
    }, 2000);
  }

  function showResult() {
    quizCard.classList.add('hidden');
    feedbackEl.classList.add('hidden');
    progressBar.style.width = '100%';
    progressText.textContent = 'Complete! 🎉';
    resultEl.classList.remove('hidden');

    const pct = Math.round((score / total) * 100);
    resultScore.textContent = `${score} / ${total}`;

    let emoji, msg;
    if (pct === 100) {
      emoji = '🏆'; msg = "Perfect score! You know me inside out! You're the best! 💕";
    } else if (pct >= 80) {
      emoji = '🌟'; msg = "So close to perfect! You really know your girl! 🌸";
    } else if (pct >= 60) {
      emoji = '😊'; msg = "Not bad, Suar! You know me better than you think! 🐷❤️";
    } else if (pct >= 40) {
      emoji = '😅'; msg = "Hmm… we need more date nights clearly! 😂💕";
    } else {
      emoji = '😂'; msg = "Oh no! We really need to talk more! But I still love you! 💗";
    }

    resultEmoji.textContent   = emoji;
    resultHeading.textContent = pct === 100 ? "Perfect Score!" : "Here's Your Score";
    resultMsg.textContent     = msg;
  }

  $('quiz-replay-btn').addEventListener('click', () => {
    current = 0; score = 0; answered = false;
    resultEl.classList.add('hidden');
    quizCard.classList.remove('hidden');
    renderQuestion();
  });

  renderQuestion();
})();


/* ══════════════════════════════════════════════════════════
   7. PHOTO GALLERY
══════════════════════════════════════════════════════════ */
(function initGallery() {
  const photos  = typeof PHOTOS !== 'undefined' ? PHOTOS : [];
  const grid    = $('gallery-grid');
  const lb      = $('lightbox');
  const lbImg   = $('lightbox-img');
  const lbCap   = $('lightbox-caption');
  const lbNote  = $('lightbox-note');
  const lbClose = $('lightbox-close');

  const rotations = [-3, -1.5, 1, 2.5, -2, 1.5, -0.5, 2, -1, 3];

  function createPlaceholder(photo, idx) {
    const div = document.createElement('div');
    div.className = 'polaroid-placeholder';
    div.innerHTML = `<span class="ph-icon">📷</span><span class="ph-text">Photo ${idx + 1}</span>`;
    return div;
  }

  photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid reveal';
    card.style.setProperty('--rot', `${rotations[idx % rotations.length]}deg`);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open photo: ${photo.caption}`);

    const tape = document.createElement('div');
    tape.className = 'polaroid-tape';

    // Try image first; show placeholder if fails
    const img = new Image();
    let   mediaEl;
    img.onload  = () => {};
    img.onerror = () => {};
    img.src = photo.file;

    // We always try the img element; CSS hides broken images
    const imgEl = document.createElement('img');
    imgEl.src   = photo.file;
    imgEl.alt   = photo.caption;
    imgEl.loading = 'lazy';
    imgEl.onerror = function() {
      this.style.display = 'none';
      const ph = createPlaceholder(photo, idx);
      card.insertBefore(ph, this);
    };
    mediaEl = imgEl;

    const cap  = document.createElement('p');
    cap.className   = 'polaroid-caption';
    cap.textContent = photo.caption;

    const note = document.createElement('p');
    note.className   = 'polaroid-note';
    note.textContent = photo.note;

    card.append(tape, mediaEl, cap, note);
    grid.appendChild(card);

    function openLightbox() {
      lbImg.src   = photo.file;
      lbImg.alt   = photo.caption;
      lbCap.textContent = photo.caption;
      lbNote.textContent = photo.note;
      lb.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      lbImg.onerror = () => { lbImg.src = ''; lbImg.alt = '(Photo not found)'; };
    }

    card.addEventListener('click', openLightbox);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(); });
  });

  function closeLightbox() {
    lb.classList.add('hidden');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();


/* ══════════════════════════════════════════════════════════
   8. 21 REASONS
══════════════════════════════════════════════════════════ */
(function initReasons() {
  const reasons = typeof LOVE_REASONS !== 'undefined' ? LOVE_REASONS : [];
  const grid    = $('reasons-grid');

  reasons.forEach((reason, idx) => {
    // Support both plain strings and { title, text } objects
    const isObj   = typeof reason === 'object' && reason !== null;
    const title   = isObj ? reason.title : null;
    const text    = isObj ? reason.text  : reason;
    const ariaStr = title ? `${title} — ${text}` : text;

    const card = document.createElement('div');
    card.className = 'reason-card reveal' + (isObj ? ' reason-card--featured' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Reason ${idx + 1}: click to reveal`);

    // Front face: number + heart icon
    // Back face: optional title + message text
    const titleHTML = title
      ? `<span class="reason-title">${title}</span>`
      : '';

    card.innerHTML = `
      <span class="reason-num">${idx + 1}</span>
      <span class="reason-heart">❤️</span>
      ${titleHTML}
      <span class="reason-text">${text}</span>
    `;

    function toggle() {
      card.classList.toggle('flipped');
      card.setAttribute('aria-label', card.classList.contains('flipped')
        ? ariaStr
        : `Reason ${idx + 1}: click to reveal`);
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(); });
    grid.appendChild(card);
  });
})();


/* ══════════════════════════════════════════════════════════
   9. LOVE LETTER
══════════════════════════════════════════════════════════ */
(function initLetter() {
  const data   = typeof LOVE_LETTER !== 'undefined' ? LOVE_LETTER : {
    salutation: "My Dearest,",
    body: "Edit this in content.js 💌",
    closing: "With love"
  };

  const envelope  = $('letter-envelope');
  const flap      = $('letter-flap');
  const paper     = $('letter-paper');
  const content   = $('letter-content');
  let   isOpen    = false;

  // Populate letter content
  content.innerHTML = `
    <div class="letter-salutation">${data.salutation}</div>
    <div class="letter-hearts">❤️ 💕 ❤️</div>
    <div class="letter-body">${escapeHTML(data.body).replace(/\n/g, '<br/>')}</div>
    <div class="letter-hearts" style="margin-top:16px">🌸 💌 🌸</div>
    <div class="letter-closing">${escapeHTML(data.closing)}</div>
  `;

  function openLetter() {
    if (isOpen) return;
    isOpen = true;
    flap.classList.add('open');
    envelope.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      paper.classList.remove('hidden');
      paper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 500);
  }

  envelope.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLetter(); });
})();

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ══════════════════════════════════════════════════════════
   10. FUTURE DREAMS
══════════════════════════════════════════════════════════ */
(function initFuture() {
  const dreams = typeof FUTURE_DREAMS !== 'undefined' ? FUTURE_DREAMS : [];
  const grid   = $('future-grid');

  dreams.forEach(dream => {
    const card = document.createElement('div');
    card.className = 'future-card reveal';
    card.innerHTML = `
      <div class="future-icon">${dream.icon}</div>
      <div class="future-title">${dream.title}</div>
      <div class="future-desc">${dream.description}</div>
    `;
    grid.appendChild(card);
  });
})();


/* ══════════════════════════════════════════════════════════
   11. BIRTHDAY CAKE — CANDLES
══════════════════════════════════════════════════════════ */
(function initCake() {
  const candles  = qsa('.candle');
  const hint     = $('cake-hint');

  function blowCandle(candle) {
    if (candle.dataset.lit === 'false') return;
    candle.dataset.lit = 'false';
    // Check all blown out
    const allBlown = Array.from(candles).every(c => c.dataset.lit === 'false');
    if (allBlown) {
      hint.textContent = '🎉 You blew them all out! Make a wish! ✨';
      hint.classList.add('blown');
      triggerConfetti();
    }
  }

  candles.forEach(c => c.addEventListener('click', () => blowCandle(c)));

  $('relight-btn').addEventListener('click', () => {
    candles.forEach(c => { c.dataset.lit = 'true'; });
    hint.textContent = 'Click the candles to blow them out! 🕯️';
    hint.classList.remove('blown');
  });

  $('confetti-btn').addEventListener('click', triggerConfetti);
})();


/* ══════════════════════════════════════════════════════════
   12. CONFETTI
══════════════════════════════════════════════════════════ */
function triggerConfetti() {
  const canvas  = $('confetti-canvas');
  const ctx     = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#EBA8BF','#F8DDE7','#831D3D','#ffffff','#FFD700','#FF69B4','#FF6347'];
  const pieces = [];
  const count  = 160;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * -canvas.height,
      w:  6 + Math.random() * 10,
      h:  10 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.2,
      vy:   3 + Math.random() * 4,
      vx:  (Math.random() - 0.5) * 2
    });
  }

  let frame;
  let frames = 0;
  const maxFrames = 240;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y     += p.vy;
      p.x     += p.vx;
      p.angle += p.spin;
      p.vy    *= 0.99;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
    frames++;
    if (frames < maxFrames) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  cancelAnimationFrame(frame);
  frames = 0;
  draw();
}


/* ══════════════════════════════════════════════════════════
   13. SCROLL-REVEAL
══════════════════════════════════════════════════════════ */
function initRevealObserver() {
  const els = qsa('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}


/* ══════════════════════════════════════════════════════════
   14. WINDOW RESIZE — CONFETTI CANVAS
══════════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  const canvas  = $('confetti-canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
