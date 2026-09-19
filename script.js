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

        // Minimalist wave ribbons matching light theme
        const waves = [
            { count: 2, speed: 0.007, amplitude: 50, color: 'rgba(0, 0, 0, 0.025)', lineWidth: 1.5 },
            { count: 3, speed: 0.010, amplitude: 70, color: 'rgba(37, 99, 235, 0.03)', lineWidth: 2 },
            { count: 4, speed: 0.013, amplitude: 85, color: 'rgba(0, 0, 0, 0.02)', lineWidth: 1.5 }
        ];

        function drawWave(w, offset) {
            ctx.beginPath();
            ctx.lineWidth = w.lineWidth;
            ctx.strokeStyle = w.color;

            const centerY = height * 0.45;
            const boost = Math.min(scrollVelocity, 35);

            for (let x = 0; x < width; x += 8) {
                const angle = (x * 0.003 * w.count) + (frame * w.speed) + offset;
                const y = centerY + Math.sin(angle) * (w.amplitude + boost) + Math.cos(angle * 0.5) * (w.amplitude * 0.35);
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
    // Initialization
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        initAmbientCanvas();
        initDeviceTilts();
        initMobileMenu();
    });

})();
