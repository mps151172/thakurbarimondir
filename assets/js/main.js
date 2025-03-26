// Language management
let currentLanguage = 'bn'; // Default language

function changeLanguage(lang) {
    currentLanguage = lang;
    applyTranslations();
    localStorage.setItem('preferredLanguage', lang);
}

function applyTranslations() {
    // Get all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key] && translations[key][currentLanguage]) {
            element.textContent = translations[key][currentLanguage];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Load preferred language from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
});
