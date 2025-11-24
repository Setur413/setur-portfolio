// DOM Elements
const modal = document.getElementById("modal");
const openModal = document.getElementById("OpenModal");
const closeModal = document.getElementById("closemodal");
const hireBtn = document.getElementById("hireBtn");
const backToTop = document.getElementById("backToTop");
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("status");

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .footer-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Modal functionality
if (openModal) {
    openModal.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    };
}

if (hireBtn) {
    hireBtn.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    };
}

if (closeModal) {
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    };
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById("fname").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subj").value,
        message: document.getElementById("message").value
    };

    try {
        // Replace with your actual backend endpoint
        const res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        
        if (data.success) {
            statusMessage.textContent = "Message sent successfully!";
            statusMessage.className = "status-message success";
            contactForm.reset();
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (err) {
        console.error('Error:', err);
        statusMessage.textContent = "Error sending message. Please try again or contact me directly.";
        statusMessage.className = "status-message error";
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
            statusMessage.textContent = "";
            statusMessage.className = "status-message";
        }, 5000);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Skills animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in');
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Typing effect for hero section (optional)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect when hero section is in view
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        heroObserver.observe(document.querySelector('.hero'));
    }
}

// Initialize typing effect
initTypingEffect();

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// Console welcome message
console.log(`%cWelcome to Jonah's Portfolio! 👋`, 
    'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log(`%cLet's build something amazing together!`, 
    'color: #64748b; font-size: 14px;');