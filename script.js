document.addEventListener('DOMContentLoaded', () => {

    /* ===== CUSTOM CURSOR ===== */
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        dot?.remove();
        ring?.remove();
    } else {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverTargets = document.querySelectorAll('a, button, .project, .cert-item, .stack-tag, input, textarea, .project-thumb');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
    }

    /* ===== PHOTO TILT 3D ===== */
    const heroPhoto = document.getElementById('heroPhoto');

    if (heroPhoto && !isTouchDevice) {
        const shine = heroPhoto.querySelector('.hero-photo-shine');
        const maxTilt = 12; // grados máximos de rotación
        let rafTilt = null;
        let targetRX = 0, targetRY = 0;
        let currentRX = 0, currentRY = 0;

        heroPhoto.addEventListener('mousemove', (e) => {
            const rect = heroPhoto.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  * 2 - 1;
            const y = (e.clientY - rect.top)  / rect.height * 2 - 1;

            targetRY =  x * maxTilt;
            targetRX = -y * maxTilt;

            if (shine) {
                const px = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
                const py = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
                shine.style.background = `radial-gradient(
                    circle at ${px}% ${py}%,
                    rgba(255,255,255,0.12) 0%,
                    transparent 55%
                )`;
            }

            heroPhoto.classList.add('tilting');
        });

        heroPhoto.addEventListener('mouseleave', () => {
            targetRX = 0;
            targetRY = 0;
            heroPhoto.classList.remove('tilting');
        });

        function animateTilt() {
            currentRX += (targetRX - currentRX) * 0.1;
            currentRY += (targetRY - currentRY) * 0.1;

            heroPhoto.style.transform = 
                `rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;

            rafTilt = requestAnimationFrame(animateTilt);
        }
        animateTilt();
    }

    /* ===== LIGHTBOX WITH NAVIGATION ===== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let lightboxImages = [];
    let lightboxIndex = 0;

    function openLightbox(thumbs, startIndex) {
        lightboxImages = Array.from(thumbs).map(t => ({
            src: t.getAttribute('data-src'),
            caption: t.getAttribute('data-caption')
        }));
        lightboxIndex = startIndex;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        if (!lightboxImages.length) return;
        lightboxImg.src = lightboxImages[lightboxIndex].src;
        lightboxCaption.textContent = lightboxImages[lightboxIndex].caption;
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImages = [];
        lightboxIndex = 0;
    }

    function navigateLightbox(dir) {
        if (!lightboxImages.length) return;
        lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    }

    document.querySelectorAll('.project').forEach(project => {
        const thumbs = project.querySelectorAll('.project-thumb');
        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => openLightbox(thumbs, i));
        });
    });

    document.querySelectorAll('.view-capturas-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const gallery = btn.getAttribute('data-gallery');
            const thumbsContainer = document.querySelector(`.project-thumbs[data-gallery="${gallery}"]`);
            if (thumbsContainer) {
                const thumbs = thumbsContainer.querySelectorAll('.project-thumb');
                if (thumbs.length) {
                    openLightbox(thumbs, 0);
                }
            }
        });
    });

    function openCarousel(gallery) {
        const btn = document.querySelector(`.view-capturas-btn[data-gallery="${gallery}"]`);
        if (btn) btn.click();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    /* ===== THEME TOGGLE ===== */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    /* ===== MOBILE MENU ===== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle?.addEventListener('click', () => navMenu?.classList.toggle('open'));

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu?.classList.remove('open'));
    });

    document.addEventListener('click', (e) => {
        if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) {
            navMenu?.classList.remove('open');
        }
    });

    /* ===== SMOOTH SCROLL ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - navH,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===== ACTIVE SECTION ===== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => sectionObs.observe(s));

    /* ===== REVEAL ANIMATIONS ===== */
    const reveals = document.querySelectorAll('.reveal');

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObs.observe(el));

    /* ===== CONTACT FORM ===== */
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const mailto = `mailto:fabianenriquepilonieta@gmail.com?subject=${encodeURIComponent(fd.get('subject'))}&body=${encodeURIComponent(`Nombre: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\nMensaje:\n${fd.get('message')}`)}`;
        window.location.href = mailto;
        e.target.reset();
    });

    /* ===== NAVBAR SCROLL ===== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

});