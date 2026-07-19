/**
 * Here i've logic for Mobile Menu, Navbar state, link tracking, Form Submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    handleMobileMenu();
    handleNavbarScroll();
    handleActiveNavLinks();
    handleContactForm();
});

// Mobile menu toggle
function handleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Change navbar style on scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }));
}

// Highlight active nav link on scroll
function handleActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', debounce(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }));
}

// Simple frontend validation for the contact form
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(form);

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (msgInput.value.trim() === '') {
            showError(msgInput, 'Message cannot be empty');
            isValid = false;
        }

        if (isValid) {
            // Mock successful submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Message Sent!';
            btn.style.background = '#10b981'; // Green confirmation color
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}

function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    const errorMsg = formGroup.querySelector('.error-msg');
    errorMsg.innerText = message;
    errorMsg.style.display = 'block';
}
