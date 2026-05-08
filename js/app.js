// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeAOS();
    initializeParticles();
    initializeNavigation();
    initializeThemeToggle();
    initializeCounters();
    initializeScrollEffects();
    initializeModals();
    initializeForms();
    initializeFilters();
    initializeFAQ();
    initializeAnimations();
    initializeLocalStorage();
    
    console.log('Superior IT Society - Application Initialized');
}

// ===== PARTICLES INITIALIZATION =====
function initializeParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00CFFF"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#1E90FF",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// ===== AOS ANIMATION INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}


// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            
            themeToggle.innerHTML = isLight ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
}

// ===== ANIMATED COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                const increment = target / speed;
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        counter.classList.add('counted');
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Smooth scrolling for anchor links
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
}

// ===== MODALS =====
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Event registration modal
    const registerButtons = document.querySelectorAll('.register-btn');
    const registrationModal = document.getElementById('registrationModal');
    const eventRegistrationForm = document.getElementById('eventRegistrationForm');

    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const eventName = button.getAttribute('data-event');
            document.getElementById('eventName').value = eventName;
            if (registrationModal) {
                registrationModal.style.display = 'block';
            }
        });
    });

    // Project submission modal
    const submitProjectBtn = document.getElementById('submitProjectBtn');
    const projectModal = document.getElementById('projectModal');
    const closeBtn = projectModal ? projectModal.querySelector('.close') : null;

    if (submitProjectBtn && projectModal) {
        submitProjectBtn.addEventListener('click', () => {
            projectModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            projectModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore background scrolling
        });
    }

    // Close modal when clicking outside the modal content
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('show');
                document.body.style.overflow = ''; // Restore background scrolling
            }
        });
    }

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close modals on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Handle form submissions
    if (eventRegistrationForm) {
        eventRegistrationForm.addEventListener('submit', handleEventRegistration);
    }

    const projectSubmissionForm = document.getElementById('projectSubmissionForm');
    if (projectSubmissionForm) {
        projectSubmissionForm.addEventListener('submit', handleProjectSubmission);
    }
}

// ===== FORMS =====
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const joinForm = document.getElementById('joinForm');
    const issueForm = document.getElementById('issueForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    if (joinForm) {
        joinForm.addEventListener('submit', handleJoinForm);
    }

    if (issueForm) {
        issueForm.addEventListener('submit', handleIssueForm);
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                showToast('Please fill in all required fields', 'error');
            }
        });
    });
}

// ===== FILTERS =====
function initializeFilters() {
    // Event filters
    const eventFilterButtons = document.querySelectorAll('.event-filters .filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    eventFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            eventFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter events
            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project filters
    const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Search functionality
    const projectSearch = document.getElementById('projectSearch');
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// ===== FAQ ACCORDION =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Network animation for mission section
    const networkAnimation = document.querySelector('.network-animation');
    if (networkAnimation) {
        animateNetwork();
    }

    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent, 100);
    }
}

function animateNetwork() {
    const nodes = document.querySelectorAll('.network-animation .node');
    
    setInterval(() => {
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transform = `scale(1.2)`;
                node.style.boxShadow = '0 0 30px rgba(0, 207, 255, 0.8)';
                
                setTimeout(() => {
                    node.style.transform = `scale(1)`;
                    node.style.boxShadow = '0 0 20px rgba(0, 207, 255, 0.5)';
                }, 500);
            }, index * 200);
        });
    }, 3000);
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== LOCAL STORAGE =====
function initializeLocalStorage() {
    // Load saved data
    loadRegistrations();
    loadProjects();
    loadIssues();
}

// ===== FORM HANDLERS =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveContactMessage(formData);
    
    // Show success message
    showToast('Your message has been sent successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

function handleJoinForm(e) {
    e.preventDefault();
    
    const formData = {
        name: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        department: e.target.querySelectorAll('input[type="text"]')[1].value,
        role: e.target.querySelector('select').value,
        skills: e.target.querySelector('textarea').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveRegistration(formData);
    
    // Show success message
    showToast('Welcome to Superior IT Society! Your registration has been received.', 'success');
    
    // Reset form
    e.target.reset();
}

function handleEventRegistration(e) {
    e.preventDefault();
    
    const formData = {
        event: document.getElementById('eventName').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        experience: document.getElementById('experience').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveEventRegistration(formData);
    
    // Show success message
    showToast(`Successfully registered for ${formData.event}!`, 'success');
    
    // Close modal and reset form
    document.getElementById('registrationModal').style.display = 'none';
    e.target.reset();
}

function handleProjectSubmission(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('projectName').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        tech: document.getElementById('projectTech').value,
        github: document.getElementById('githubLink').value,
        demo: document.getElementById('demoLink').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveProject(formData);
    
    // Show success message
    showToast('Your project has been submitted successfully!', 'success');
    
    // Close modal and reset form
    const projectModal = document.getElementById('projectModal');
    projectModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
    e.target.reset();
}

function handleIssueForm(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('issueTitle').value,
        category: document.getElementById('issueCategory').value,
        description: document.getElementById('issueDescription').value,
        priority: document.getElementById('issuePriority').value,
        timestamp: new Date().toISOString(),
        status: 'open'
    };
    
    // Save to localStorage
    saveIssue(formData);
    
    // Show success message
    showToast('Your issue has been submitted successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

// ===== LOCAL STORAGE FUNCTIONS =====
function saveContactMessage(data) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function saveRegistration(data) {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push(data);
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

function saveEventRegistration(data) {
    const eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    eventRegistrations.push(data);
    localStorage.setItem('eventRegistrations', JSON.stringify(eventRegistrations));
}

function saveProject(data) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push(data);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function saveIssue(data) {
    const issues = JSON.parse(localStorage.getItem('issues') || '[]');
    issues.push(data);
    localStorage.setItem('issues', JSON.stringify(issues));
}

function loadRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    console.log('Loaded registrations:', registrations);
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    console.log('Loaded projects:', projects);
}

function loadIssues() {
    const issues = JSON.parse(localStorage.getItem('issues') || '[]');
    console.log('Loaded issues:', issues);
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ff3b30';
    } else if (type === 'warning') {
        toastIcon.className = 'fas fa-exclamation-triangle';
        toastIcon.style.color = '#ff9500';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#34c759';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATION =====
const optimizedScroll = throttle(() => {
    // Scroll-based animations
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 15);

window.addEventListener('scroll', optimizedScroll);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    showToast('An unexpected error occurred. Please try again.', 'error');
});

// ===== SERVICE WORKER REGISTRATION (FOR PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Add role to main content areas
    const main = document.querySelector('main') || document.body;
    if (!main.getAttribute('role')) {
        main.setAttribute('role', 'main');
    }
    
}

enhanceAccessibility();

// ===== LAUNCH ANIMATION =====
function addLaunchAnimation() {
    const launchScreen = document.createElement('div');
    launchScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const logo = document.createElement('img');
    logo.src = 'assets/images/superior_it_society_logo.png';
    logo.style.cssText = `
        width: 150px;
        height: auto;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    launchScreen.appendChild(logo);
    document.body.appendChild(launchScreen);
    
    setTimeout(() => {
        launchScreen.style.opacity = '0';
        setTimeout(() => {
            launchScreen.remove();
        }, 500);
    }, 1500);
}


// Launch animation removed to fix loading image issue

console.log('Superior IT Society - All systems operational!');
