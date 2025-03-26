// মোবাইল মেনু টগল ফাংশন
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.createElement('div');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    document.querySelector('nav').prepend(menuBtn);
    
    menuBtn.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });
});

// স্মুথ স্ক্রোলিং
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});