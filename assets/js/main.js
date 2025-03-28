// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.addEventListener('click', function() {
            navContainer.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-container a').forEach(link => {
        link.addEventListener('click', function() {
            navContainer.classList.remove('active');
        });
    });
});

// Current year for copyright
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('[data-current-year]');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});
