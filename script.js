// Language switching functionality
let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        }
    });

    document.querySelectorAll('[data-en][data-fr]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.dataset.en;
        } else {
            element.textContent = element.dataset.fr;
        }
    });
}

document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
        switchLanguage(option.dataset.lang);
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    document.querySelectorAll('.fade-in').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
            element.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contact form toggle (only runs if elements exist)
const writeMessageBtn = document.getElementById('writeMessageBtn');
const contactForm = document.getElementById('contactForm');
const closeFormBtn = document.getElementById('closeFormBtn');

if (writeMessageBtn && contactForm) {
    writeMessageBtn.addEventListener('click', function () {
        if (contactForm.classList.contains('active')) {
            contactForm.classList.remove('active');
            setTimeout(() => { contactForm.style.display = 'none'; }, 300);
        } else {
            contactForm.style.display = 'block';
            setTimeout(() => { contactForm.classList.add('active'); }, 10);
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

if (closeFormBtn && contactForm) {
    document.addEventListener('click', function (event) {
        if (contactForm.classList.contains('active') &&
            !contactForm.contains(event.target) &&
            !writeMessageBtn.contains(event.target)) {
            closeFormBtn.click();
        }
    });
}

// Form submission (only runs if a form exists)
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const message = currentLang === 'en'
            ? 'Thank you for your message! We will get back to you soon.'
            : 'Merci pour votre message ! Nous vous répondrons bientôt.';
        alert(message);
        this.reset();
        if (closeFormBtn) closeFormBtn.click();
    });
}

// Bootcamp day tabs (only runs if buttons exist)
function openDay(dayId) {
    document.querySelectorAll('.day-content').forEach(day => day.classList.remove('active'));
    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    const dayEl = document.getElementById(dayId);
    if (dayEl) dayEl.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
}

// Hamburger mobile nav
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navCenter.classList.toggle('open');
    });

    navCenter.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navCenter.classList.remove('open');
        });
    });
}