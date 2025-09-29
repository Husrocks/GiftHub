// Hamburger Menu Toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const toggle = document.querySelector('.toggle-switch');
    body.classList.toggle('dark-mode');
    toggle.classList.toggle('active');
    
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check saved dark mode preference
window.addEventListener('load', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.toggle-switch').classList.add('active');
    }
});

// Cart functionality
let cartCount = 0;

function addToCart() {
    cartCount++;
    updateCartCount();
    showNotification('Product added to cart!');
    createConfetti();
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.animation = 'none';
    setTimeout(() => {
        cartCountElement.style.animation = 'pop 0.5s';
    }, 10);
}

function toggleCart() {
    showNotification(`You have ${cartCount} items in your cart`);
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s, slideOutRight 0.5s 2s forwards;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2500);
}

// Add CSS for notification animations and fixes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Preserve original animations */
    .product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    }
    
    /* Fix for overlapping sections */
    .features {
        position: relative;
        z-index: 10;
        background: white;
        margin-top: 0;
    }
    
    .dark-mode .features {
        background: #1a1a1a;
    }
    
    .hero {
        position: relative;
        z-index: 5;
        overflow: hidden;
    }
    
    /* Ensure proper stacking */
    section {
        position: relative;
        background: inherit;
    }
    
    /* Maintain original hover effects */
    .product-card:hover {
        transform: translateY(-10px) !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
    }
    
    /* Keep feature card original animations */
    .feature-card {
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modified Intersection Observer - only for elements without existing animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // Only add animation if not already animated
            if (!entry.target.style.animation) {
                entry.target.style.animation = entry.target.dataset.animation || 'fadeIn 1s';
            }
        }
    });
}, observerOptions);

// Only observe elements that need scroll animations
document.querySelectorAll('.observe-on-scroll').forEach(el => {
    observer.observe(el);
});

// Subtle Parallax effect - reduced to prevent overlap
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 300) { // Further limit parallax
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add typing effect to hero heading
function typeWriter() {
    const text = "Perfect Gifts for Every Occasion";
    const h1 = document.querySelector('.hero h1');
    let i = 0;
    
    if (h1) {
        h1.textContent = '';
        
        function type() {
            if (i < text.length) {
                h1.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        setTimeout(type, 2000); // Start after loader
    }
}

window.addEventListener('load', typeWriter);

// Add confetti effect on add to cart
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#667eea', '#764ba2', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: confetti-fall 1s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        // Random rotation and position
        confetti.style.setProperty('--random-x', (Math.random() - 0.5) * 600 + 'px');
        confetti.style.setProperty('--random-y', Math.random() * -500 + 'px');
        confetti.style.setProperty('--random-rotate', Math.random() * 720 + 'deg');
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--random-x), var(--random-y)) rotate(var(--random-rotate));
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);



// Magnetic button effect - only for specific buttons
document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Tilt effect only on mouse move for feature cards - reduced intensity
document.querySelectorAll('.feature-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    
    card.addEventListener('mousemove', function(e) {
        if (isHovering) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Reduced rotation
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        isHovering = false;
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add subtle particles background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.2;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 10; i++) { // Even fewer particles
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 30 + 30}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 50 - 25}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);








// Put this at the end of body or in your main JS file
document.addEventListener('DOMContentLoaded', () => {

    // Helper: inject a <style> once (prevents duplicate 'const style' problems)
    function addGlobalStyleOnce(id, css) {
        if (!document.getElementById(id)) {
            const s = document.createElement('style');
            s.id = id;
            s.textContent = css;
            document.head.appendChild(s);
        }
    }

    // Remove stray top progress bar (temporary safety net)
    (function removeTopProgressBar() {
        // Target likely injected topbars (heuristic)
        const bar = Array.from(document.querySelectorAll('div')).find(d => {
            try {
                return d.style && d.style.height === '4px' && d.style.transition.includes('width') &&
                       d.style.background && d.style.background.includes('linear-gradient');
            } catch (e) { return false; }
        });
        if (bar) bar.remove();
    })();

    // Add particle keyframes & small helper styles once
    addGlobalStyleOnce('particle-styles', `
        @keyframes particle-float {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 0.25; }
            90% { opacity: 0.25; }
            100% { transform: translateY(-120vh); opacity: 0; }
        }
        .particles-container div { will-change: transform, opacity; }
    `);

    // Create subtle particles background (non-interactive)
    function createParticles({count = 12} = {}) {
        if (document.querySelector('.particles-container')) return; // only once
        const container = document.createElement('div');
        container.className = 'particles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; /* important: allows mouse events through */
            z-index: 0; /* keep it behind UI; change to -1 if you must, but 0 is safer */
            opacity: 0.15;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const size = (Math.random() * 2 + 1).toFixed(2);
            const left = (Math.random() * 100).toFixed(2);
            const top = (Math.random() * 100).toFixed(2);
            const duration = (20 + Math.random() * 30).toFixed(2);
            p.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(102,126,234,0.6);
                left: ${left}%;
                top: ${top}%;
                animation: particle-float ${duration}s linear ${Math.random()*-20}s infinite;
            `;
            container.appendChild(p);
        }
    }

    // Feature-card tilt (reduced intensity). Works only if elements exist and are not covered.
    function initTilt() {
        const cards = document.querySelectorAll('.feature-card, .feature-card *'); // try to catch where class might be
        if (!cards || cards.length === 0) return;

        document.querySelectorAll('.feature-card').forEach(card => {
            let isHovering = false;
            card.style.willChange = 'transform';
            card.addEventListener('mouseenter', () => isHovering = true);
            card.addEventListener('mousemove', function (e) {
                if (!isHovering) return;
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20; // smaller divisor => more rotation; increase to reduce
                const rotateY = (centerX - x) / 20;
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                this.style.transition = 'transform 0.08s linear';
            });
            card.addEventListener('mouseleave', function () {
                isHovering = false;
                this.style.transition = 'transform 0.4s cubic-bezier(.2,.7,.2,1)';
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Safety: check for overlaying elements that block mouse events
    (function warnIfOverlayBlocks() {
        // If top fixed elements have very high z-index they might block mouse.
        const highFixed = Array.from(document.querySelectorAll('body *')).find(el => {
            const s = getComputedStyle(el);
            return (s.position === 'fixed' || s.position === 'sticky') && +s.zIndex > 9999 && s.pointerEvents !== 'none';
        });
        if (highFixed) {
            console.warn('High fixed/sticky element may block interactions (z-index > 9999):', highFixed);
        }
    })();

    // Initialize confetti CSS once
    addGlobalStyleOnce('confetti-styles', `
        @keyframes confetti-fall {
            0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
            100% { transform: translate(var(--random-x), var(--random-y)) rotate(var(--random-rotate)); opacity: 0; }
        }
    `);

    // Small utility: safe query and warn
    function qs(selector) {
        const el = document.querySelector(selector);
        if (!el) console.debug(`Selector not found: ${selector}`);
        return el;
    }

    // Run initializers
    try {
        createParticles({count: 14});
        initTilt();
    } catch (err) {
        console.error('Init error:', err);
    }

    // Global error logger (helps trap runtime errors)
    window.addEventListener('error', (ev) => {
        console.error('Runtime error caught:', ev.error || ev.message, ev);
    });

    // Helpful guidance log
    console.info('Interaction initializers: particles + tilt attached (if elements exist). If something still does not work: check console for "Uncaught" errors or overlay elements blocking pointer-events.');
});
