export function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');
    
    let currentSectionId = '';
    const scrollPosition = window.scrollY;

    // Always handle home section for main page
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        if (scrollPosition < 100) {
            const homeSection = document.querySelector('section#home');
            if (homeSection) {
                currentSectionId = 'home';
                history.replaceState(null, '', '#home');
            }
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
            return;
        }
    }

    // Handle other sections and pages
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.id;
            if (currentSectionId) {
                history.replaceState(null, '', `#${currentSectionId}`);
            }
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSectionId}`) {
            item.classList.add('active');
        }
    });
}

export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
