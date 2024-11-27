// Typing animation
const typed = new Typed('.typing-text', {
    strings: ['Hello, I\'m Jaugon', 'I\'m a Data Engineer', 'I Build Solutions', 'I\'m always learning'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator functionality
function scrollToNextSection(currentSectionId) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    const nextSection = sections[currentIndex + 1];
    
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
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

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Update active navigation item based on scroll position or page
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    // If we're on the certifications page
    if (currentPath.endsWith('certifications.html')) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'certifications.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        return;
    }
    
    // For the main page, track scroll position
    const fromTop = window.scrollY + window.innerHeight/2;
    
    let currentSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (fromTop >= sectionTop && fromTop <= sectionTop + sectionHeight) {
            currentSection = section;
        }
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentSection && href === `#${currentSection.id}`) {
            link.classList.add('active');
        } else if (!currentSection && href === '#home') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll event listener for main page navigation
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveNavItem);
});

// Update active state on page load
window.addEventListener('load', updateActiveNavItem);

// Update active state when clicking navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Only handle active states for hash links (section navigation)
        if (link.getAttribute('href').startsWith('#')) {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                const bar = entry.target.querySelector('.skill-level');
                setTimeout(() => {
                    bar.style.width = level;
                }, 200); // Small delay for better visual effect
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
};

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Modern scroll and navigation handling
const initModernScrolling = () => {
    const progressBar = document.querySelector('.scroll-progress');
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navHeight = 70; // Match the nav height from CSS
    let lastScroll = 0;
    
    // Update progress bar and navigation visibility
    window.addEventListener('scroll', () => {
        // Progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Smart navigation hiding
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            nav.classList.remove('nav-hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > navHeight) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
        
        // Active section highlighting with improved accuracy
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                section.classList.add('active');
                const currentSection = section.getAttribute('id');
                
                // Update navigation links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
                });
            } else {
                section.classList.remove('active');
            }
        });
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initFloatingNav();
    initContactForm();
    initModernScrolling();
    animateSkillBars();
});
