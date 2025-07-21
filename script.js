// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
// REMOVE this block:
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 100) {
//         navbar.style.background = 'rgba(255, 255, 255, 0.98)';
//         navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//     } else {
//         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = 'none';
//     }
// });

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-content, .project-card, .skill-item, .contact-method');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        setTimeout(() => {
            typeWriter(titleName, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.floating-card');
    const scrolled = window.pageYOffset;
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in a real app, you'd send this to a server)
        showNotification('This functionality is not available yet. Apologies for the inconvenience.', 'failure');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Skill hover effects
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1) translateY(0)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on page load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cursor trail effect (optional)
let mouseX = 0;
let mouseY = 0;
let cursor = null;

function createCursor() {
    cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
}

function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursor) {
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    }
}

// Uncomment to enable cursor trail effect
// document.addEventListener('DOMContentLoaded', createCursor);
// document.addEventListener('mousemove', updateCursor);

// Add some CSS for the loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .notification {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style); 

// Starfield animation
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;
    const numStars = 200;

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * w,
                o: 0.5 + Math.random() * 0.5,
                r: 0.7 + Math.random() * 1.3
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(0,255,231,${star.o})`;
            ctx.shadowColor = '#00ffe7';
            ctx.shadowBlur = 8;
            ctx.fill();
        }
    }

    function animateStars() {
        for (let i = 0; i < numStars; i++) {
            stars[i].x += 0.05 * (stars[i].z / w) * (Math.random() - 0.5);
            stars[i].y += 0.1 * (stars[i].z / w) + 0.2;
            if (stars[i].y > h) {
                stars[i].x = Math.random() * w;
                stars[i].y = 0;
            }
        }
        drawStars();
        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', () => {
        resize();
        createStars();
    });

    resize();
    createStars();
    animateStars();
} 

// Improved Drag-and-drop for floating cards
function makeFloatingCardsDraggable() {
    const cards = document.querySelectorAll('.floating-card');
    let draggingCard = null;
    let offsetX = 0;
    let offsetY = 0;
    let startLeft = 0;
    let startTop = 0;

    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            draggingCard = card;
            card.style.cursor = 'grabbing';
            // Remove animation and parallax while dragging
            card.style.animation = 'none';
            card._parallaxDisabled = true;
            // Calculate offset
            const rect = card.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            startLeft = card.offsetLeft;
            startTop = card.offsetTop;
            // Bring to front
            card.style.zIndex = 1000;
            // Prevent text selection
            e.preventDefault();
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!draggingCard) return;
        const parent = draggingCard.parentElement;
        const parentRect = parent.getBoundingClientRect();
        let newLeft = e.clientX - parentRect.left - offsetX;
        let newTop = e.clientY - parentRect.top - offsetY;
        // Optional: Boundaries
        newLeft = Math.max(0, Math.min(newLeft, parent.offsetWidth - draggingCard.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, parent.offsetHeight - draggingCard.offsetHeight));
        draggingCard.style.left = newLeft + 'px';
        draggingCard.style.top = newTop + 'px';
        draggingCard.style.position = 'absolute';
        draggingCard.style.transform = '';
    });

    document.addEventListener('mouseup', () => {
        if (draggingCard) {
            draggingCard.style.cursor = 'grab';
            draggingCard._parallaxDisabled = false;
            draggingCard = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', makeFloatingCardsDraggable);

// Update parallax effect to skip cards being dragged
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.floating-card');
    const scrolled = window.pageYOffset;
    cards.forEach((card, index) => {
        if (card._parallaxDisabled) return;
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
}); 