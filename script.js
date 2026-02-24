/**
 * Fabisdev Portfolio v2 - Script Principal Consolidado
 * Todas las funcionalidades en un único archivo
 * Sin necesidad de módulos ni build process
 */

// ===== UTILIDADES =====

/**
 * Validar email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Mostrar notificación toast
 */
const showNotification = (message, type = 'info', duration = 3000) => {
  const notification = document.createElement('div');
  const bgColor = {
    success: 'bg-accent text-bg-dark',
    error: 'bg-red-500 text-white',
    info: 'bg-neon-blue text-bg-dark'
  }[type] || 'bg-neon-blue text-bg-dark';

  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg 
                             font-semibold z-50 animate-slide-in ${bgColor}`;
  notification.textContent = message;
  notification.setAttribute('role', 'status');

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove('animate-slide-in');
    notification.classList.add('animate-fade-out');
    setTimeout(() => notification.remove(), 300);
  }, duration);
};

/**
 * Copy to clipboard
 */
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Copiado al portapapeles', 'success');
    return true;
  } catch (err) {
    showNotification('Error al copiar', 'error');
    return false;
  }
};

// ===== HERO MODULE =====

/**
 * Typing Effect para el subtítulo
 */
function initTypingEffect() {
  const typingElement = document.getElementById('typing');
  if (!typingElement) return;

  const roles = [
    'Full Stack Developer',
    'QA Engineer',
    'Backend Specialist',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingElement.textContent = currentRole.substring(0, charIndex);

    const typeSpeed = isDeleting ? 50 : 100;
    const deleteDelay = 2000;
    const nextRoleDelay = 500;

    if (charIndex === currentRole.length && !isDeleting) {
      isDeleting = true;
      setTimeout(type, deleteDelay);
    } else if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, nextRoleDelay);
    } else {
      setTimeout(type, typeSpeed);
    }
  };

  type();
}

function initHero() {
  initTypingEffect();
}

// ===== SCROLL ANIMATIONS MODULE =====

/**
 * Smooth scroll para links internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    });
  });
}

/**
 * Navbar background on scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-black/95');
    } else {
      navbar.classList.remove('bg-black/95');
    }
  });
}

/**
 * Scroll animations con Intersection Observer
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// ===== FORMS MODULE =====

/**
 * Maneja el envío del formulario de contacto
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const name = formData.get('name')?.trim() || '';
  const email = formData.get('email')?.trim() || '';
  const subject = formData.get('subject')?.trim() || '';
  const message = formData.get('message')?.trim() || '';

  // Validación
  if (!name || !email || !subject || !message) {
    showNotification('Por favor completa todos los campos', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Por favor ingresa un email válido', 'error');
    return;
  }

  if (message.length < 10) {
    showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
    return;
  }

  // Cambiar botón a estado loading
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="inline-block animate-spin">⏳</span> Enviando...';

  try {
    // Enviar por mailto
    const mailtoLink = `mailto:fabisdev@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    )}`;

    window.location.href = mailtoLink;

    // Reset formulario
    form.reset();
    
    showNotification('Abriéndose tu cliente de email...', 'success');
  } catch (error) {
    console.error('Error al enviar formulario', error);
    showNotification('Error al enviar el formulario', 'error');
  } finally {
    // Restaurar botón
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

/**
 * Validación en tiempo real del email
 */
function initFormValidation() {
  const emailInput = document.querySelector('input[name="email"]');
  if (!emailInput) return;

emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim();
    if (value && !isValidEmail(value)) {
      emailInput.classList.add('border-red-500');
      emailInput.classList.remove('border-neon-blue');
    } else {
      emailInput.classList.remove('border-red-500');
      emailInput.classList.add('border-neon-blue');
    }
  });
}

/**
 * Inicializar formulario de contacto
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', handleFormSubmit);
}

// ===== INICIALIZACIÓN PRINCIPAL =====

/**
 * Inicializar portfolio cuando el DOM esté listo
 */
function initPortfolio() {
  console.log('====================================');
  console.log('Inicializando Fabisdev Portfolio v2');
  console.log('====================================');

  // Core modules
  initHero();
  initScrollAnimations();
  initSmoothScroll();
  initNavbarScroll();
  
  // Forms
  initContactForm();
  initFormValidation();

  console.log('Portfolio inicializado completamente ✓');
  console.log('====================================');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

// ==================== EFECTO DE ESCRITURA ====================

const typingElement = document.getElementById('typing');
const roles = ['Full Stack Developer', 'Backend Engineer', 'QA Specialist'];
let currentRole = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = roles[currentRole];
    
    if (!isDeleting && currentChar < currentText.length) {
        typingElement.textContent += currentText[currentChar];
        currentChar++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && currentChar > 0) {
        typingElement.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
        setTimeout(typeEffect, 50);
    } else if (!isDeleting && currentChar === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

// Iniciar efecto de escritura
window.addEventListener('load', () => {
    typeEffect();
});

// ==================== PROYECTOS ====================

const projects = {
    mv1: {
        title: 'MV Inventario 1.0',
        description: '🎓 Mi primer proyecto empresarial. Aquí aprendí a construir una arquitectura backend robusta desde cero: rutas, controladores, servicios y base de datos relacional. Dashboard con 4 KPIs, análisis en tiempo real con Chart.js y exportación de reportes.',
        images: [
            'public/assets/images/projects/Mv inventario 1-0/login.png',
            'public/assets/images/projects/Mv inventario 1-0/dashboard.png',
            'public/assets/images/projects/Mv inventario 1-0/metricas.png',
            'public/assets/images/projects/Mv inventario 1-0/historial de movimientos.png'
        ],
        imageLabels: ['Login', 'Dashboard', 'Métricas', 'Historial'],
        technologies: ['Node.js', 'Express.js', 'MySQL', 'JavaScript', 'Chart.js'],
        features: [
            '📊 Dashboard con 4 KPIs principales',
            '📈 Análisis en tiempo real con Chart.js',
            '📄 Exportación de reportes (Excel, CSV, PDF)',
            '📱 Interfaz responsive',
            '🔐 Autenticación de usuarios',
            '📋 Historial de movimientos'
        ],
        learnings: [
            '✅ Arquitectura backend con Node.js y Express',
            '✅ Diseño de bases de datos relacional (MySQL)',
            '✅ Visualización de datos con Chart.js',
            '✅ Buenas prácticas de estructura de carpetas',
            '✅ Manejo de errores básico'
        ],
        github: '#',
        demo: '#'
    },
mvpro: {
        title: 'MV Inventario Pro',
        description: '🚀 La versión mejorada. Aquí aprendí a diseñar correctamente. Optimicé queries de 10 segundos a 85ms, agregué validación con Zod, seguridad JWT, módulo POS con facturación automática, y containerización con Docker. Este proyecto me enseñó que la calidad es arquitectura.',
        images: [], // Placeholder - solo HTML en el modal
        imageHtml: '<i class="fas fa-crown text-8xl text-neon-cyan/40"></i>',
        technologies: ['Node.js', 'Express.js', 'MySQL', 'Docker', 'Zod', 'JWT'],
        features: [
            '💳 Módulo POS con facturación automática',
            '🧮 Cálculo automático de impuestos',
            '⚡ Queries optimizadas (10s → 85ms)',
            '📦 Aplicación containerizada con Docker',
            '🔒 Validación con Zod en 3 capas',
            '🛡️ Seguridad JWT',
            '📊 Reportes PDF y Excel',
            '📝 Auditoría completa de cambios'
        ],
        learnings: [
            '⭐ Optimización de queries (10s → 85ms con índices)',
            '⭐ Containerización con Docker para deployment',
            '⭐ Validación robusta de datos (Zod)',
            '⭐ Seguridad en autenticación (JWT)',
            '⭐ Error handling y logging profesional',
            '⭐ UX considerando el usuario',
            '⭐ Los errores son oportunidades de mejora arquitectónica'
        ],
        github: '#',
        demo: '#'
    }
};

// ==================== PROYECTO SHOWCASE CON CARRUSEL INLINE ====================

document.querySelectorAll('.project-showcase').forEach(showcase => {
    const projectId = showcase.dataset.project;
    const project = projects[projectId];
    
    // Solo si el proyecto tiene múltiples imágenes
    if (project.images && project.images.length > 1) {
        let currentImageIndex = 0;
        const img = showcase.querySelector('img') || showcase.querySelector('[data-image]');
        const carousel = showcase.querySelector('.carousel-prev');
        
        // Si existe carrusel, agregar lógica
        if (carousel) {
            const nextBtn = showcase.querySelector('.carousel-next');
            const prevBtn = showcase.querySelector('.carousel-prev');
            const dots = showcase.querySelectorAll('.carousel-dot');
            
            function updateImage(index) {
                currentImageIndex = (index + project.images.length) % project.images.length;
                
                // Actualizar imagen si existe
                if (img) {
                    img.src = project.images[currentImageIndex];
                    img.classList.add('carousel-image');
                    setTimeout(() => img.classList.remove('carousel-image'), 300);
                }
                
                // Actualizar dots
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentImageIndex);
                });
            }
            
            nextBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateImage(currentImageIndex + 1);
            });
            
            prevBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                updateImage(currentImageIndex - 1);
            });
            
            dots.forEach((dot) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateImage(parseInt(dot.dataset.slide));
                });
            });
        }
    }
});

// ==================== DEPRECATED: PROJECT MODAL (MANTENER PARA COMPATIBILIDAD) ====================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projects[projectId];
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        
        // Si tiene múltiples imágenes, crear carrusel
        let imageHTML = '';
        if (project.images && project.images.length > 0) {
            imageHTML = `
                <div class="relative mb-8">
                    <div class="relative h-80 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg overflow-hidden">
                        <img id="projectImage" src="${project.images[0]}" alt="${project.title}" class="w-full h-full object-cover">
                    </div>
                    ${project.images.length > 1 ? `
                        <button id="prevImage" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-neon-cyan rounded-full p-2 hover:bg-neon-blue/50 transition">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button id="nextImage" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-neon-cyan rounded-full p-2 hover:bg-neon-blue/50 transition">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="flex justify-center gap-2 mt-3">
                            ${project.images.map((img, idx) => `
                                <button class="image-dot ${idx === 0 ? 'bg-neon-cyan' : 'bg-neon-blue/40'} w-2 h-2 rounded-full transition" data-index="${idx}"></button>
                            `).join('')}
                        </div>
                        <p id="imageLabel" class="text-center text-sm text-text-muted mt-2">${project.imageLabels ? project.imageLabels[0] : `${project.title}`}</p>
                    ` : ''}
                </div>
            `;
        }
        
        modalContent.innerHTML = `
            <button id="closeModal" class="absolute top-4 right-4 text-neon-cyan hover:text-neon-blue transition-colors text-2xl">
                <i class="fas fa-times"></i>
            </button>
            ${imageHTML}
            <h2 class="text-3xl font-bold text-neon-blue mb-2 text-center">${project.title}</h2>
            <p class="text-text-muted mb-6 text-center">${project.description}</p>
            <div class="mb-8">
                <h3 class="text-lg font-bold text-neon-cyan mb-4">Tecnologías</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="px-3 py-1 bg-neon-blue/20 text-neon-cyan rounded-full text-sm font-semibold">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 class="text-lg font-bold text-neon-cyan mb-4">Características</h3>
                    <ul class="space-y-2">
                        ${project.features.map(f => `<li class="flex items-start gap-2"><span class="text-neon-blue font-bold mt-1">✓</span><span class="text-text-muted text-sm">${f}</span></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-neon-cyan mb-4">Aprendizajes</h3>
                    <ul class="space-y-2">
                        ${project.learnings.map(l => `<li class="flex items-start gap-2"><span class="text-neon-cyan font-bold mt-1">•</span><span class="text-text-muted text-sm">${l}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.getElementById('closeModal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        // Carrusel de imágenes
        if (project.images && project.images.length > 1) {
            let currentImageIndex = 0;
            const projectImage = document.getElementById('projectImage');
            const imageLabel = document.getElementById('imageLabel');
            const nextBtn = document.getElementById('nextImage');
            const prevBtn = document.getElementById('prevImage');
            
            function updateImage(index) {
                currentImageIndex = (index + project.images.length) % project.images.length;
                projectImage.src = project.images[currentImageIndex];
                imageLabel.textContent = project.imageLabels ? project.imageLabels[currentImageIndex] : project.title;
                
                document.querySelectorAll('.image-dot').forEach((dot, idx) => {
                    dot.classList.toggle('bg-neon-cyan', idx === currentImageIndex);
                    dot.classList.toggle('bg-neon-blue/40', idx !== currentImageIndex);
                });
            }
            
            nextBtn.addEventListener('click', () => updateImage(currentImageIndex + 1));
            prevBtn.addEventListener('click', () => updateImage(currentImageIndex - 1));
            
            document.querySelectorAll('.image-dot').forEach((dot) => {
                dot.addEventListener('click', () => updateImage(parseInt(dot.dataset.index)));
            });
        }
    });
});

// ==================== CERTIFICADOS ====================

document.querySelectorAll('.cert-preview').forEach(button => {
    button.addEventListener('click', () => {
        const certId = button.dataset.cert;
        const certificates = {
            cert1: 'public/assets/images/certificados/certificado de claude code.pdf',
            cert2: 'public/assets/images/certificados/certificado-claseflix PowerBI.pdf',
            cert3: 'public/assets/images/certificados/curador de datos.pdf',
            cert4: null // En proceso
        };
        
        // Los PDFs se abren en nueva pestaña
        if (certificates[certId]) {
            window.open(certificates[certId], '_blank');
        }
    });
});

// Cerrar modal de certificados
document.getElementById('closeCertModal')?.addEventListener('click', () => {
    document.getElementById('certModal').classList.add('hidden');
});

// Cerrar al hacer click fuera
document.getElementById('certModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'certModal') e.target.classList.add('hidden');
});
});

document.getElementById('closeCertModal')?.addEventListener('click', () => {
    document.getElementById('certModal').classList.add('hidden');
});

// ==================== FORMULARIO ====================

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:fabisdev@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    
    const button = document.querySelector('button[type="submit"]');
    button.innerHTML = '<i class="fas fa-check mr-2"></i>¡Mensaje enviado!';
    button.style.pointerEvents = 'none';
    setTimeout(() => {
        button.innerHTML = 'Enviar Mensaje';
        button.style.pointerEvents = 'auto';
        document.getElementById('contactForm').reset();
    }, 3000);
});

// ==================== INTERACTIVIDAD ====================

document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') e.target.classList.add('hidden');
});

document.getElementById('certModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'certModal') e.target.classList.add('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#hero') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== SCROLL ANIMATIONS - INTERSECTION OBSERVER ====================

/**
 * Elegante scroll animation system
 * Fade + translateY suave, stagger ligero, duración 0.6-0.8s
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll('.scroll-fade, .scroll-stagger, .scroll-scale, .scroll-slide-left, .scroll-slide-right').forEach(el => {
    observer.observe(el);
});

// Additional observer for sections to add fade-in on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0.95';
    sectionObserver.observe(section);
});

// ===== EXPORTAR UTILIDADES (opcional, por si se necesitan en consola) =====
window.portfolioUtils = {
  showNotification,
  copyToClipboard,
  isValidEmail
};