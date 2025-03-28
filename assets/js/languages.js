const translations = {
    // Common Translations
    'site-title': {
        'bn': 'মিলরোড ঠাকুরবাড়ী বারোয়ারী মন্ডপ',
        'en': 'Milroad Thakurbari Community Mondop',
        'hi': 'मिलरोड ठाकुरबाड़ी सामुदायिक मंडप'
    },
    'home-link': {
        'bn': 'হোম',
        'en': 'Home',
        'hi': 'होम'
    },
    'history-link': {
        'bn': 'ইতিহাস',
        'en': 'History',
        'hi': 'इतिहास'
    },
    'events-link': {
        'bn': 'আয়োজন',
        'en': 'Events',
        'hi': 'आयोजन'
    },
    'gallery-link': {
        'bn': 'গ্যালারি',
        'en': 'Gallery',
        'hi': 'गैलरी'
    },
    'location-link': {
        'bn': 'অবস্থান',
        'en': 'Location',
        'hi': 'स्थान'
    },
    'contact-link': {
        'bn': 'যোগাযোগ',
        'en': 'Contact',
        'hi': 'संपर्क'
    },
    'copyright-text': {
        'bn': '© ২০২৫ মিলরোড ঠাকুরবাড়ী বারোয়ারী পূজা কমিটি | সকল স্বত্ব সংরক্ষিত',
        'en': '© 2025 Milroad Thakurbari Puja Committee | All Rights Reserved',
        'hi': '© 2025 मिलरोड ठाकुरबाड़ी पूजा समिति | सर्वाधिकार सुरक्षित'
    },
    
    // Homepage Specific
    'default-welcome': {
        'bn': 'মিলরোড ঠাকুরবাড়ী বারোয়ারী মন্ডপে আপনাকে স্বাগতম',
        'en': 'Welcome to Milroad Thakurbari Community Mondop',
        'hi': 'मिलरोड ठाकुरबाड़ी सामुदायिक मंडप में आपका स्वागत है'
    },
    'main-heading': {
        'bn': 'শ্রী শ্রী মিলরোড ঠাকুরবাড়ী বারোয়ারী পূজা ২০২৫',
        'en': 'Shri Shri Milroad Thakurbari Community Puja 2025',
        'hi': 'श्री श्री मिलरोड ठाकुरबाड़ी सामुदायिक पूजा 2025'
    },
    
    // Add all other translations used in your pages...
    // This should include all data-translate keys from all HTML files
};

// Function to apply translations
function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key] && translations[key][currentLanguage]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[key][currentLanguage]);
            } else {
                element.textContent = translations[key][currentLanguage];
            }
        }
    });
}
