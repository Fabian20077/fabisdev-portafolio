// Fabisdev Portfolio - JavaScript Navigation

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== CARRUSEL DE PROYECTOS =====
    const carouselData = {
        mv1: {
            images: [
                { src: 'assets/images/projects/mv-inventario-1-0/login.png', caption: 'Pantalla de Login' },
                { src: 'assets/images/projects/mv-inventario-1-0/dashboard.png', caption: 'Dashboard Principal' },
                { src: 'assets/images/projects/mv-inventario-1-0/metricas.png', caption: 'Métricas en Tiempo Real' },
                { src: 'assets/images/projects/mv-inventario-1-0/historial%20de%20movimientos.png', caption: 'Historial de Movimientos' }
            ]
        },
        mvpro: {
            images: [
                { src: 'assets/images/projects/mv-inventario-pro/dashboard.png', caption: 'Dashboard Pro' },
                { src: 'assets/images/projects/mv-inventario-pro/Metricas.png', caption: 'Métricas Avanzadas' },
                { src: 'assets/images/projects/mv-inventario-pro/historial%20de%20precios.png', caption: 'Historial de Precios' },
                { src: 'assets/images/projects/mv-inventario-pro/gestion%20de%20Productos.png', caption: 'Gestión de Productos' },
                { src: 'assets/images/projects/mv-inventario-pro/gestion%20de%20impuestos.png', caption: 'Gestión de Impuestos' },
                { src: 'assets/images/projects/mv-inventario-pro/configuraciones.png', caption: 'Configuraciones (Beta)' },
                { src: 'assets/images/projects/mv-inventario-pro/facturacion.png', caption: 'Facturación (Beta)' }
            ]
        }
    };

    window.currentCarousel = null;
    window.currentImageIndex = 0;

    window.openCarousel = function(project) {
        window.currentCarousel = project;
        window.currentImageIndex = 0;
        
        const modal = document.getElementById('carouselModal');
        const img = document.getElementById('carouselImage');
        const caption = document.getElementById('carouselCaption');
        const dots = document.getElementById('carouselDots');
        
        const data = carouselData[project];
        if (!data) return;
        
        img.src = data.images[0].src;
        caption.textContent = data.images[0].caption;
        
        // Create dots
        dots.innerHTML = '';
        data.images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.style.cssText = 'display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0 5px; cursor: pointer;';
            dot.style.background = i === 0 ? '#00d9ff' : 'rgba(0,217,255,0.3)';
            dot.onclick = () => goToImage(i);
            dots.appendChild(dot);
        });
        
        modal.style.display = 'flex';
    };

    window.closeCarousel = function() {
        document.getElementById('carouselModal').style.display = 'none';
        window.currentCarousel = null;
    };

    window.changeImage = function(direction) {
        const data = carouselData[window.currentCarousel];
        if (!data) return;
        
        window.currentImageIndex = (window.currentImageIndex + direction + data.images.length) % data.images.length;
        updateCarousel();
    };

    window.goToImage = function(index) {
        window.currentImageIndex = index;
        updateCarousel();
    };

    function updateCarousel() {
        const data = carouselData[window.currentCarousel];
        const img = document.getElementById('carouselImage');
        const caption = document.getElementById('carouselCaption');
        const dots = document.getElementById('carouselDots');
        
        img.src = data.images[window.currentImageIndex].src;
        caption.textContent = data.images[window.currentImageIndex].caption;
        
        Array.from(dots.children).forEach((dot, i) => {
            dot.style.background = i === window.currentImageIndex ? '#00d9ff' : 'rgba(0,217,255,0.3)';
        });
    }

    // ===== CERTIFICADOS =====
    window.openCert = function(certPath) {
        window.open(certPath, '_blank');
    };

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeCarousel();
    });

    // Close modal on background click
    document.getElementById('carouselModal').addEventListener('click', (e) => {
        if (e.target.id === 'carouselModal') window.closeCarousel();
    });

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const handleScroll = () => {
        navbar.style.background = window.scrollY > 50 ? 'rgba(5, 8, 18, 0.98)' : 'rgba(5, 8, 18, 0.95)';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Active section
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = { rootMargin: '-20% 0px -60% 0px', threshold: 0 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = '#9ca3af';
                    if (link.dataset.section === sectionId) link.style.color = '#00d9ff';
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Typing effect
    const typingEl = document.getElementById('typing');
    if (typingEl) {
        const roles = ['Full Stack Developer', 'QA Engineer', 'Backend Specialist', 'Problem Solver'];
        let i = 0, j = 0, deleting = false;
        
        function type() {
            typingEl.textContent = roles[i].substring(0, j);
            if (!deleting) {
                j++;
                if (j > roles[i].length) { deleting = true; setTimeout(type, 2000); }
                else setTimeout(type, 100);
            } else {
                j--;
                if (j < 0) { deleting = false; i = (i + 1) % roles.length; setTimeout(type, 500); }
                else setTimeout(type, 50);
            }
        }
        type();
    }

    // Contact form
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const mailto = `mailto:fabianenriquepilonieta@gmail.com?subject=${encodeURIComponent(formData.get('subject'))}&body=${encodeURIComponent(`Nombre: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMensaje:\n${formData.get('message')}`)}`;
        window.location.href = mailto;
        form.reset();
        alert('Abriéndose cliente de email...');
    });

    // Event listeners para carruseles de proyectos
    const carouselMv1 = document.getElementById('carousel-mv1');
    const carouselMvpro = document.getElementById('carousel-mvpro');
    
    if (carouselMv1) {
        carouselMv1.addEventListener('click', () => openCarousel('mv1'));
    }
    if (carouselMvpro) {
        carouselMvpro.addEventListener('click', () => openCarousel('mvpro'));
    }

    console.log('✅ Portfolio initialized');
});
