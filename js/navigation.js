export function initFloatingNav() {
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 100) {
                    navbar.classList.remove('navbar-hidden');
                } else if (currentScroll > lastScroll) {
                    // Scroll down
                    navbar.classList.add('navbar-hidden');
                } else if (currentScroll < lastScroll) {
                    // Scroll up
                    navbar.classList.remove('navbar-hidden');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

export function initNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si el enlace comienza con #, es una navegación interna
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Actualizar la URL sin recargar la página
                    history.pushState(null, '', href);
                }
            }
            // Si no comienza con #, permitir el comportamiento por defecto (navegación normal)
        });
    });
}

export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', initFloatingNav);
