/**
 * RYVON BEATZ — Light Theme Minimalist Audio Script
 * Features subtle ambient audio waveforms, 3D card tilts, and smooth navigation.
 */

(function () {
    'use strict';

    const systemHeader = document.getElementById('systemHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const ambientCanvas = document.getElementById('ambientCanvas');

    // =========================================================================
    // 1. Soft Ambient Audio Reactive Wave Canvas
    // =========================================================================
    function initAmbientCanvas() {
        if (!ambientCanvas) return;

        const ctx = ambientCanvas.getContext('2d');
        let width = (ambientCanvas.width = window.innerWidth);
        let height = (ambientCanvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = ambientCanvas.width = window.innerWidth;
            height = ambientCanvas.height = window.innerHeight;
        });

        let frame = 0;
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;
        let mouseX = width / 2;
        let mouseY = height / 2;
        let targetMouseX = mouseX;
        let targetMouseY = mouseY;

        window.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollVelocity = Math.abs(currentScrollY - lastScrollY) * 0.04;
            lastScrollY = currentScrollY;

            if (currentScrollY > 30) {
                systemHeader?.classList.add('scrolled');
            } else {
                systemHeader?.classList.remove('scrolled');
            }
        }, { passive: true });

        // React Bits: Harmonic Acoustic Wave Ribbons
        const waves = [
            { count: 1.8, speed: 0.006, amplitude: 45, color: 'rgba(0, 0, 0, 0.025)', lineWidth: 1.5 },
            { count: 2.8, speed: 0.009, amplitude: 65, color: 'rgba(37, 99, 235, 0.035)', lineWidth: 2 },
            { count: 3.6, speed: 0.012, amplitude: 80, color: 'rgba(0, 0, 0, 0.018)', lineWidth: 1.5 }
        ];

        function drawWave(w, offset) {
            ctx.beginPath();
            ctx.lineWidth = w.lineWidth;
            ctx.strokeStyle = w.color;

            const centerY = height * 0.46;
            const boost = Math.min(scrollVelocity, 30);

            for (let x = 0; x <= width + 10; x += 10) {
                const angle = (x * 0.0028 * w.count) + (frame * w.speed) + offset;
                // Gentle organic deflection toward mouse cursor
                const distToMouse = Math.abs(x - mouseX);
                const mouseInfluence = Math.max(0, (260 - distToMouse) / 260) * ((mouseY - centerY) * 0.1);

                const y = centerY + Math.sin(angle) * (w.amplitude + boost) + Math.cos(angle * 0.48) * (w.amplitude * 0.3) + mouseInfluence;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            mouseX += (targetMouseX - mouseX) * 0.04;
            mouseY += (targetMouseY - mouseY) * 0.04;

            waves.forEach((wave, idx) => {
                drawWave(wave, idx * 1.8);
            });

            frame++;
            scrollVelocity *= 0.95;
            requestAnimationFrame(render);
        }

        render();
    }

    // =========================================================================
    // 2. Interactive 3D Perspective Tilt on App Screenshots
    // =========================================================================
    function initDeviceTilts() {
        const deviceFrames = document.querySelectorAll('[data-tilt]');

        deviceFrames.forEach((frame) => {
            frame.addEventListener('mousemove', (e) => {
                const rect = frame.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            frame.addEventListener('mouseleave', () => {
                frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // =========================================================================
    // 3. Mobile Navigation Drawer
    // =========================================================================
    function initMobileMenu() {
        if (!mobileMenuBtn || !mobileDrawer) return;

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link');
        drawerLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================================================
    // 4. Smooth FAQ Accordion Behavior
    // =========================================================================
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach((item) => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    faqItems.forEach((other) => {
                        if (other !== item && other.open) {
                            other.open = false;
                        }
                    });
                }
            });
        });
    }

    // =========================================================================
    // 5. React Bits: Spotlight Card Effect
    // =========================================================================
    function initSpotlightCards() {
        const spotlightCards = document.querySelectorAll('.spotlight-card');
        if (!spotlightCards.length) return;

        spotlightCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // =========================================================================
    // 6. React Bits: Magnetic Button Physics
    // =========================================================================
    function initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('[data-magnetic]');
        if (!magneticButtons.length || window.matchMedia('(pointer: coarse)').matches) return;

        magneticButtons.forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                // Subtle magnetic pull (15% damping)
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // =========================================================================
    // 7. React Bits: BlurText / Scroll Reveal
    // =========================================================================
    function initBlurReveal() {
        const revealElements = document.querySelectorAll('.blur-reveal');
        if (!revealElements.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((el) => observer.observe(el));
    }

    // =========================================================================
    // Initialization
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        initAmbientCanvas();
        initDeviceTilts();
        initMobileMenu();
        initFaqAccordion();
        initSpotlightCards();
        initMagneticButtons();
        initBlurReveal();
    });

})();
