// DOM Elements
const cookieBanner = document.querySelector('.cookie-banner');
const cookieClose = document.querySelector('.cookie-close');
const cookieButtons = document.querySelectorAll('.cookie-btn');
const navDots = document.querySelectorAll('.dot');
const playButtons = document.querySelectorAll('.play-btn, .cta-button');

// Cookie Banner Functionality
function hideCookieBanner() {
    cookieBanner.style.opacity = '0';
    cookieBanner.style.transform = 'translateY(100%)';
    setTimeout(() => {
        cookieBanner.style.display = 'none';
    }, 300);
}

// Cookie banner event listeners
if (cookieClose) {
    cookieClose.addEventListener('click', hideCookieBanner);
}

cookieButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        
        // Handle different cookie preferences
        if (buttonText === 'Accept All') {
            localStorage.setItem('cookiePreference', 'accepted');
        } else if (buttonText === 'Disable All') {
            localStorage.setItem('cookiePreference', 'disabled');
        } else if (buttonText === 'Customize Settings') {
            // In a real implementation, this would open a settings modal
            console.log('Opening cookie settings...');
            return; // Don't hide banner for customize
        }
        
        hideCookieBanner();
    });
});

// Check if user has already made a cookie choice
if (localStorage.getItem('cookiePreference')) {
    cookieBanner.style.display = 'none';
}

// Navigation Dots Functionality
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        navDots.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Add visual feedback
        dot.style.transform = 'scale(1.8)';
        setTimeout(() => {
            dot.style.transform = dot.classList.contains('active') ? 'scale(1.5)' : 'scale(1)';
        }, 150);
        
        // In a real implementation, this would navigate to different sections
        console.log(`Navigating to section ${index + 1}`);
    });
});

// Play Button Functionality
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation
        button.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // In a real implementation, this would redirect to the game
        console.log('Redirecting to game...');
        
        // Simulate loading state
        const originalText = button.textContent;
        button.textContent = 'LOADING...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
});

// Smooth scroll behavior for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add visual feedback
        link.style.color = 'var(--primary-purple)';
        setTimeout(() => {
            link.style.color = '';
        }, 200);
        
        console.log(`Navigating to: ${link.textContent}`);
    });
});

// Social media links
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 150);
        
        console.log('Opening social media link...');
    });
});

// Parallax effect for background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body::before');
    
    // Update CSS custom property for parallax effect
    document.documentElement.style.setProperty('--scroll-offset', scrolled * 0.5 + 'px');
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'Escape':
            if (cookieBanner.style.display !== 'none') {
                hideCookieBanner();
            }
            break;
        case 'Enter':
        case ' ':
            if (e.target.classList.contains('dot')) {
                e.target.click();
            }
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            if (document.activeElement && document.activeElement.classList.contains('dot')) {
                e.preventDefault();
                const currentIndex = Array.from(navDots).indexOf(document.activeElement);
                let nextIndex;
                
                if (e.key === 'ArrowUp') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : navDots.length - 1;
                } else {
                    nextIndex = currentIndex < navDots.length - 1 ? currentIndex + 1 : 0;
                }
                
                navDots[nextIndex].focus();
            }
            break;
    }
});

// Make navigation dots focusable
navDots.forEach(dot => {
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Navigation dot ${Array.from(navDots).indexOf(dot) + 1}`);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.tournament-logo, .event-title, .prize-section, .cta-section');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation for main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize-specific logic here
        console.log('Window resized');
    }, 250);
});

// Add hover effects for better interactivity
const interactiveElements = document.querySelectorAll('button, .nav-link, .social-icon, .dot');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.2s ease';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transition = 'all 0.2s ease';
    });
});

// Console welcome message
console.log(`
🦁 Welcome to Loaded Lions Manecity World Series III
🎮 Uncharted Blitz Tournament
💰 Prize Pool: US$25,000+
📅 22.08.25 - 29.08.25

Ready to play? Click the PLAY FOR FREE button!
`);
