document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Active Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for navbar
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations
    // Add 'reveal' class to elements we want to animate
    const revealElements = document.querySelectorAll('.section-title, .about-text, .tech-card, .project-card, .lab-diagram, .lab-info, .cert-card, .exp-card, .contact-card');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    
    // Trigger once on load
    reveal();
});

// ─── Project Detail Toggle ───────────────────────────────────────────────────

/**
 * Muestra una sección de detalle de proyecto (oculta por defecto).
 * @param {string} sectionId  - El id de la sección a mostrar.
 * @param {HTMLElement} btn   - El botón que activó la acción.
 */
function mostrarDetalle(sectionId, btn) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Mostrar sección
    section.classList.remove('detail-hidden');
    section.classList.add('detail-visible');

    // Scroll suave hasta la sección
    setTimeout(() => {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
        const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
}

/**
 * Oculta una sección de detalle y vuelve a la sección de proyectos.
 * @param {string} sectionId - El id de la sección a ocultar.
 */
function cerrarDetalle(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.classList.add('detail-hidden');
    section.classList.remove('detail-visible');

    // Volver a la sección de proyectos
    const proyectos = document.getElementById('proyectos');
    if (proyectos) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
        const top = proyectos.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

/**
 * Muestra/oculta los proyectos no destacados y actualiza el botón.
 * @param {HTMLElement} btn - El botón "Ver más proyectos".
 */
function toggleExtraProjects(btn) {
    const extraGrid = document.getElementById('extra-projects');
    if (!extraGrid) return;

    const isHidden = extraGrid.classList.contains('extra-projects-hidden');

    if (isHidden) {
        // Mostrar
        extraGrid.classList.remove('extra-projects-hidden');
        extraGrid.classList.add('extra-projects-visible');
        btn.innerHTML = '<i class="fas fa-chevron-up"></i> Ocultar proyectos';
        // Scroll hasta los proyectos extra
        setTimeout(() => {
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
            const top = extraGrid.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }, 50);
    } else {
        // Ocultar
        extraGrid.classList.add('extra-projects-hidden');
        extraGrid.classList.remove('extra-projects-visible');
        btn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver más proyectos';
        // Volver al inicio de proyectos
        const proyectos = document.getElementById('proyectos');
        if (proyectos) {
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
            const top = proyectos.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
}

