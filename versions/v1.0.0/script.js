// Theme Toggle with improved transitions
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Add transition class before any theme changes
    document.body.classList.add('theme-transition');
    
    // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === null) {
        document.body.classList.toggle('dark-theme', prefersDarkScheme.matches);
    } else {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }
    
    updateThemeIcon();
    
    // Remove transition class after initial load
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
    
    themeToggle.addEventListener('click', () => {
        // Add transition class before theme toggle
        document.body.classList.add('theme-transition');
        
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        updateThemeIcon();
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
            document.body.classList.add('theme-transition');
            document.body.classList.toggle('dark-theme', e.matches);
            updateThemeIcon();
            
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        }
    });
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-toggle i');
    const newIcon = document.body.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon';
    
    // Add fade out
    icon.style.opacity = '0';
    
    setTimeout(() => {
        icon.className = newIcon;
        // Fade in
        icon.style.opacity = '1';
    }, 150);
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const options = {
        strings: [
            'Hi, I\'m Jaugon',
            'I Create Web Experiences',
            'I Build Modern Websites',
            'I Love Design'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        onStringTyped: (arrayPos) => {
            // Add a subtle animation to the cursor
            const cursor = document.querySelector('.typed-cursor');
            if (cursor) {
                cursor.style.animation = 'none';
                cursor.offsetHeight; // Trigger reflow
                cursor.style.animation = null;
            }
        }
    };

    new Typed('.typing-text', options);
}

// Improved Scroll Animations
function initScrollAnimations() {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        once: false,
        offset: 50,
        easing: 'ease-out-cubic',
        mirror: true,
        anchorPlacement: 'top-bottom'
    });

    // Reinitialize AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });

    // Initialize skill bar animations with intersection observer
    const skillBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const parent = bar.closest('.skill-item');
                const percentage = parent.querySelector('.skill-percentage').textContent;
                bar.style.width = percentage;
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Enhanced Floating Navigation
function initFloatingNav() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.classList.remove('floating');
                    header.style.transform = 'translateY(0)';
                } else if (currentScroll > lastScroll && !header.classList.contains('floating')) {
                    // Scrolling down - hide header
                    header.classList.add('floating');
                    header.style.transform = 'translateY(-100%)';
                } else if (currentScroll < lastScroll && header.classList.contains('floating')) {
                    // Scrolling up - show header
                    header.classList.remove('floating');
                    header.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Improved Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Enhanced Contact Form with validation
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const inputs = form.querySelectorAll('input, textarea');
        
        // Disable form
        button.textContent = 'Sending...';
        button.disabled = true;
        inputs.forEach(input => input.disabled = true);
        
        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success feedback
            button.textContent = 'Message Sent!';
            button.style.backgroundColor = '#4CAF50';
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.backgroundColor = '';
                inputs.forEach(input => input.disabled = false);
            }, 3000);
            
        } catch (error) {
            // Error feedback
            button.textContent = 'Error! Try Again';
            button.style.backgroundColor = '#f44336';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.backgroundColor = '';
                inputs.forEach(input => input.disabled = false);
            }, 3000);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingAnimation();
    initScrollAnimations();
    initFloatingNav();
    initSmoothScroll();
    initContactForm();
});
