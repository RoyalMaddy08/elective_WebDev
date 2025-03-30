// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Toggle the hamburger icon
            const spans = this.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu on link click
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Scroll to Top Button
    const toTopBtn = document.getElementById('toTopBtn');
    
    if (toTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                toTopBtn.classList.add('show');
            } else {
                toTopBtn.classList.remove('show');
            }
        });
        
        toTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            
            // Update the icon
            const icon = this.querySelector('i');
            if (icon) {
                if (newTheme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
        
        // Set initial icon based on current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            if (currentTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // Modal functionality
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    function showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modal.classList.add('show');
    }
    
    function hideModal() {
        modal.classList.remove('show');
    }
    
    if (modal && closeModal && modalBtn) {
        closeModal.addEventListener('click', hideModal);
        modalBtn.addEventListener('click', hideModal);
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                hideModal();
            }
        });
    }
    
    // Form Submissions
    
    // Waitlist Form
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                zipCode: document.getElementById('zipCode').value,
                userType: document.getElementById('userType').value
            };
            
            // In a real application, you would send this data to your server
            console.log('Waitlist form submitted:', formData);
            
            // Show success message
            showModal('Waitlist Joined!', 'You\'ve been added to our waitlist successfully. We\'ll notify you when we launch in your area.');
            
            // Reset form
            waitlistForm.reset();
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to your server
            console.log('Contact form submitted:', formData);
            
            // Show success message
            showModal('Message Sent!', 'Thank you for contacting us. We will get back to you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adding animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .stat-card, .step-card, .pricing-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }
    
    // Initialize animation styles
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .step-card, .pricing-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    // Initial call for elements that might be already in view
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Create a sticky header effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            if (currentScroll > 100) {
                header.style.transform = "translateY(-100%)";
            }
        } else {
            // Scrolling up
            header.style.transform = "translateY(0)";
        }
        
        if (currentScroll <= 100) {
            header.style.transform = "translateY(0)";
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // Login and Signup forms (for login.html and signup.html pages)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };
            
            // In a real application, you would authenticate with your server
            console.log('Login submitted:', formData);
            
            // For demo purposes, redirect to a dashboard page
            window.location.href = 'dashboard.html';
        });
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value
            };
            
            // In a real application, you would register with your server
            console.log('Signup submitted:', formData);
            
            // Show success message
            showModal('Registration Successful!', 'Your account has been created. You can now log in.');
            
            // Reset form
            signupForm.reset();
        });
    }
});
