// Typing animation
function setupTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const words = ['Hi, I\'m Jaugon', 'Welcome to my portfolio', 'I\'m a Data Engineer', 'I Build Solutions'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Speed control
        let typeSpeed = isDeleting ? 50 : 100;

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start the animation
    type();
}

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

// Navigation click handler
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

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

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateBar = (bar) => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Modern scroll and navigation handling
function initModernScrolling() {
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

// Smooth image loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = hero.querySelector('.hero::before');
        if (heroBackground) {
            heroBackground.style.transform = `translateZ(-1px) scale(2) translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Smooth section transitions
const sectionObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        } else {
            entry.target.style.opacity = '0.7';
        }
    });
}, sectionObserverOptions);

const sectionsToObserve = document.querySelectorAll('section');
sectionsToObserve.forEach(section => {
    section.style.opacity = '0.7';
    sectionObserver.observe(section);
});

// Enhanced hover effects for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) 
            translateZ(20px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) translateZ(0) rotateX(0) rotateY(0)';
    });
});

// Interactive Smoke Effect
class SmokeParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 2;
        this.weight = Math.random() * 0.5 - 0.2;
        this.directionX = Math.random() * 2 - 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.speed = Math.random() * 1 + 0.2;
    }

    update(mouseX, mouseY) {
        // Follow mouse with subtle movement
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }

        this.y += this.weight;
        this.x += this.directionX;
        
        if (this.size >= 0.3) this.size -= 0.05;
        if (this.alpha >= 0.03) this.alpha -= 0.005;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ff1744';
        ctx.fill();
        ctx.restore();
    }
}

function initSmokeEffect() {
    const canvas = document.getElementById('smokeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationFrame;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles(x, y) {
        const particlesToCreate = 3;
        for (let i = 0; i < particlesToCreate; i++) {
            particles.push(new SmokeParticle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create particles at mouse position
        if (Math.random() < 0.3) {
            createParticles(mouseX, mouseY);
        }

        // Update and draw particles
        particles.forEach((particle, index) => {
            particle.update(mouseX, mouseY);
            particle.draw(ctx);
            
            // Remove particles that are too small or transparent
            if (particle.size <= 0.3 || particle.alpha <= 0.03) {
                particles.splice(index, 1);
            }
        });

        // Limit number of particles
        if (particles.length > 100) {
            particles = particles.slice(-100);
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }, { passive: false });

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup function
    return () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        particles = [];
    };
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    setupTypingAnimation();
    initScrollAnimations();
    initFloatingNav();
    initSmokeEffect();
    initContactForm();
    initModernScrolling();
    animateSkillBars();
});
