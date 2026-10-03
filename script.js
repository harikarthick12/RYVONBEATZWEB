/**
 * RYVON MUSIC (RYVON BEATZ) — APPLE MUSIC THEMED INTERACTIONS
 * Includes:
 * 1. Apple Music dynamic fluid ambient gradient mesh canvas
 * 2. Hero play/pause ambient toggle
 * 3. Horizontal offer gallery with paddle scroll controls
 * 4. Interactive "+" expandable feature card drawers (.tile-boc)
 * 5. Interactive Karaoke Lyrics simulator (Apple Music Sing mode)
 * 6. Live audio visualizer canvas
 * 7. Apple-style Accordion FAQ toggle
 * 8. Mobile navigation drawer
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Apple Music Dynamic Ambient Canvas (Mesh Gradient Orbs)
  // =========================================================================
  let isAnimationPlaying = true;
  let animFrameId = null;

  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });

    // Apple Music Vibrant Color Orbs
    const orbs = [
      { x: width * 0.25, y: height * 0.35, vx: 0.8, vy: 0.6, r: Math.max(width, height) * 0.42, color: 'rgba(250, 35, 59, 0.42)' },  // Apple Red
      { x: width * 0.75, y: height * 0.45, vx: -0.7, vy: 0.5, r: Math.max(width, height) * 0.45, color: 'rgba(232, 50, 115, 0.38)' }, // Pink/Magenta
      { x: width * 0.5, y: height * 0.7, vx: 0.6, vy: -0.6, r: Math.max(width, height) * 0.4, color: 'rgba(121, 40, 202, 0.35)' },   // Deep Purple
      { x: width * 0.8, y: height * 0.8, vx: -0.5, vy: -0.8, r: Math.max(width, height) * 0.38, color: 'rgba(192, 0, 32, 0.32)' }    // Crimson
    ];

    let t = 0;

    function render() {
      if (!isAnimationPlaying) return;

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      t += 0.01;

      // Draw blended fluid orbs
      ctx.globalCompositeOperation = 'screen';
      orbs.forEach((orb, i) => {
        orb.x += Math.sin(t + i) * orb.vx;
        orb.y += Math.cos(t + i * 1.5) * orb.vy;

        // Soft bounce boundaries
        if (orb.x < width * 0.1) orb.x = width * 0.1;
        if (orb.x > width * 0.9) orb.x = width * 0.9;
        if (orb.y < height * 0.1) orb.y = height * 0.1;
        if (orb.y > height * 0.9) orb.y = height * 0.9;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      animFrameId = requestAnimationFrame(render);
    }

    render();

    // Play/Pause button in hero bottom-right
    const playPauseBtn = document.getElementById('heroPlayPauseBtn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isAnimationPlaying = !isAnimationPlaying;
        playPauseBtn.classList.toggle('paused', !isAnimationPlaying);
        playPauseBtn.setAttribute('aria-label', isAnimationPlaying ? 'Pause background gradient animation' : 'Play background gradient animation');

        const playIcon = playPauseBtn.querySelector('.icon-play');
        const pauseIcon = playPauseBtn.querySelector('.icon-pause');
        if (playIcon && pauseIcon) {
          playIcon.style.display = isAnimationPlaying ? 'none' : 'block';
          pauseIcon.style.display = isAnimationPlaying ? 'block' : 'none';
        }

        if (isAnimationPlaying) {
          render();
        } else if (animFrameId) {
          cancelAnimationFrame(animFrameId);
        }
      });
    }
  }

  // =========================================================================
  // 2. Horizontal Scroll Gallery with Paddle Buttons
  // =========================================================================
  function initGalleryPaddles() {
    const scrollContainer = document.getElementById('offerScrollContainer');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');

    if (!scrollContainer || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 3. Apple Feature Cards: Interactive "+" Expandable Trays (.tile-boc)
  // =========================================================================
  function initExpandableCards() {
    const cardTriggers = document.querySelectorAll('.tile-boc-trigger');

    cardTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const card = trigger.closest('.tile-feature');
        if (!card) return;

        const isExpanded = card.classList.contains('expanded');
        card.classList.toggle('expanded', !isExpanded);
        trigger.setAttribute('aria-expanded', !isExpanded);

        // Announce to screen readers
        const cardTitle = card.querySelector('.typography-headline-super')?.textContent || 'Card';
        trigger.setAttribute('aria-label', !isExpanded ? `Close details for ${cardTitle}` : `Learn more about ${cardTitle}`);
      });
    });
  }

  // =========================================================================
  // 4. Interactive Karaoke Lyrics & Real Audio Playback (Ryvon Sing)
  // =========================================================================
  function initLyricsSimulator() {
    const audio = document.getElementById('lyricsAudio');
    const playBtn = document.getElementById('lyricsPlayBtn');
    const stream = document.getElementById('lyricsStream');
    const lyricsLines = document.querySelectorAll('.lyrics-line');
    const progressFill = document.getElementById('lyricsProgressFill');
    const progressBar = document.getElementById('lyricsProgressBar');
    const currentTimeEl = document.getElementById('lyricsCurrentTime');
    const durationEl = document.getElementById('lyricsDuration');
    const vocalSlider = document.getElementById('vocalSlider');
    const vocalVal = document.getElementById('vocalValue') || document.getElementById('vocalVal');

    if (!lyricsLines.length) return;

    let isPlaying = false;
    let activeIndex = 0;

    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function scrollToLine(index) {
      if (!stream || !lyricsLines[index]) return;
      const el = lyricsLines[index];
      const streamHeight = stream.clientHeight;
      const target = el.offsetTop - stream.offsetTop - (streamHeight / 2) + (el.clientHeight / 2);
      stream.scrollTo({
        top: Math.max(0, target),
        behavior: 'smooth'
      });
    }

    function setActiveLine(index) {
      if (activeIndex === index && lyricsLines[index]?.classList.contains('active')) return;
      lyricsLines.forEach((line, i) => {
        line.classList.toggle('active', i === index);
      });
      activeIndex = index;
      scrollToLine(index);
    }

    function updatePlayButtonUI(playing) {
      isPlaying = playing;
      if (playBtn) {
        playBtn.classList.toggle('playing', playing);
        playBtn.setAttribute('aria-label', playing ? 'Pause song' : 'Play song');
        const playIcon = playBtn.querySelector('.icon-play');
        const pauseIcon = playBtn.querySelector('.icon-pause');
        if (playIcon && pauseIcon) {
          playIcon.style.display = playing ? 'none' : 'block';
          pauseIcon.style.display = playing ? 'block' : 'none';
        }
      }
    }

    function playAudio(startSeconds) {
      if (audio) {
        if (typeof startSeconds === 'number') {
          audio.currentTime = startSeconds;
        }
        audio.play().then(() => {
          updatePlayButtonUI(true);
        }).catch(err => {
          console.log('Audio autoplay awaiting user touch/gesture:', err);
          updatePlayButtonUI(false);
        });
      }
    }

    function pauseAudio() {
      if (audio) {
        audio.pause();
      }
      updatePlayButtonUI(false);
    }

    function togglePlay() {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    }

    // Play/Pause button click
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    // Touch or click any lyric line to play that exact line!
    lyricsLines.forEach((line, index) => {
      line.addEventListener('click', () => {
        const start = parseFloat(line.getAttribute('data-start')) || 0;
        setActiveLine(index);
        playAudio(start);
      });

      // Keyboard accessibility
      line.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const start = parseFloat(line.getAttribute('data-start')) || 0;
          setActiveLine(index);
          playAudio(start);
        }
      });
    });

    // Native audio time update listener for real-time synchronization
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        const cur = audio.currentTime;
        const dur = audio.duration || 30;

        // Update progress bar fill
        if (progressFill) {
          progressFill.style.width = `${(cur / dur) * 100}%`;
        }
        if (currentTimeEl) {
          currentTimeEl.textContent = formatTime(cur);
        }
        if (durationEl && audio.duration) {
          durationEl.textContent = formatTime(audio.duration);
        }

        // Find and highlight matching line
        let foundIdx = -1;
        lyricsLines.forEach((line, idx) => {
          const start = parseFloat(line.getAttribute('data-start')) || 0;
          const end = parseFloat(line.getAttribute('data-end')) || 999;
          if (cur >= start && cur < end) {
            foundIdx = idx;
          }
        });

        if (foundIdx !== -1) {
          setActiveLine(foundIdx);
        }
      });

      audio.addEventListener('play', () => updatePlayButtonUI(true));
      audio.addEventListener('pause', () => updatePlayButtonUI(false));
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        setActiveLine(0);
        updatePlayButtonUI(false);
      });

      // Progress bar click seeking
      if (progressBar) {
        progressBar.addEventListener('click', (e) => {
          const rect = progressBar.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(1, clickX / rect.width));
          const targetTime = pct * (audio.duration || 30);
          playAudio(targetTime);
        });
      }
    }

    // When the user scrolls through the section, auto-play the song
    const cardSing = document.getElementById('card-ryvon-sing');
    if (cardSing && 'IntersectionObserver' in window) {
      let hasTriggeredOnScroll = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasTriggeredOnScroll && !isPlaying) {
            hasTriggeredOnScroll = true;
            playAudio(0);
          }
        });
      }, {
        threshold: 0.35
      });
      observer.observe(cardSing);
    }

    // Vocal Slider adjustments
    if (vocalSlider && vocalVal) {
      vocalSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        vocalVal.textContent = `${val}%`;
        if (audio) {
          audio.volume = Math.max(0.1, val / 100);
        }
      });
    }

    // Default to line 0 on load
    setActiveLine(0);
  }

  // =========================================================================
  // 5. Visualizer Canvas for Card 1 (Listening Experience)
  // =========================================================================
  function initVisualizerCanvas() {
    const canvas = document.getElementById('cardVisualizerCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 460;
    canvas.height = 360;

    let frame = 0;
    const barsCount = 28;

    function renderBars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = 7;
      const spacing = 7;
      const startX = (canvas.width - (barsCount * (barWidth + spacing))) / 2;

      for (let i = 0; i < barsCount; i++) {
        // Pseudo-audio frequency spectrum wave
        const heightMultiplier = Math.sin(frame * 0.05 + i * 0.28) * 0.5 + 0.5;
        const barHeight = Math.max(12, heightMultiplier * 150 + Math.sin(frame * 0.1 + i) * 35);
        const x = startX + i * (barWidth + spacing);
        const y = canvas.height / 2 - barHeight / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#fa243c');
        grad.addColorStop(0.5, '#fb5c74');
        grad.addColorStop(1, '#7928ca');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
      }

      frame++;
      requestAnimationFrame(renderBars);
    }

    renderBars();
  }

  // =========================================================================
  // 6. Accordion FAQ (Apple Style Exclusive Toggle)
  // =========================================================================
  function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        if (!item) return;

        const isOpen = item.classList.contains('open');

        // Close other items
        document.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.accordion-button')?.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // =========================================================================
  // 7. Mobile Navigation Toggle
  // =========================================================================
  function initMobileNav() {
    const menuBtn = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');

    if (!menuBtn || !mobileDrawer) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', !isOpen);
      menuBtn.setAttribute('aria-expanded', !isOpen);
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 8. Sticky Localnav Active Spy
  // =========================================================================
  function initScrollSpy() {
    const localnav = document.getElementById('localnav');
    const navLinks = document.querySelectorAll('.localnav-link');
    const sections = document.querySelectorAll('section[id]');

    function update() {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        localnav?.classList.add('scrolled');
      } else {
        localnav?.classList.remove('scrolled');
      }

      let currentId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentId = sec.getAttribute('id');
        }
      });

      if (currentId) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // =========================================================================
  // 9. Apple Signature Scroll-Driven Swipe-Up Reveal
  // =========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.swipe-up-reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('animated'));
      return;
    }

    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top > windowHeight) {
        el.classList.add('will-animate');
      } else {
        el.classList.add('animated');
      }
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      if (el.classList.contains('will-animate')) {
        observer.observe(el);
      }
    });
  }

  // =========================================================================
  // 10. Apple Constellation Parallax Scroll
  // =========================================================================
  function initConstellationParallax() {
    const constellationGrid = document.querySelector('.constellation-grid');
    if (!constellationGrid) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = constellationGrid.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const translateY = (progress - 0.5) * -40;
            const rotate = (progress - 0.5) * 4;
            const pills = constellationGrid.querySelectorAll('.album-art-pill');
            pills.forEach((pill, i) => {
              const speed = (i % 2 === 0 ? 1 : -0.7) * (i + 1) * 6;
              pill.style.transform = `translateY(${translateY * 0.4 + speed * (progress - 0.5)}px) rotate(${rotate * (i % 2 === 0 ? 1 : -1)}deg)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // =========================================================================
  // Initializer
  // =========================================================================
  function init() {
    initHeroCanvas();
    initGalleryPaddles();
    initExpandableCards();
    initLyricsSimulator();
    initVisualizerCanvas();
    initAccordion();
    initMobileNav();
    initScrollSpy();
    initScrollReveal();
    initConstellationParallax();

    const urlParams = new URLSearchParams(window.location.search);
    const scrollTarget = urlParams.get('scroll');
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
