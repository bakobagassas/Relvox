
(function () {
    'use strict';
 
    /* ── Default language: French ── */
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof switchLanguage === 'function') {
            switchLanguage('fr');
        } else {
            document.querySelectorAll('[data-en][data-fr]').forEach(el => {
                el.textContent = el.dataset.fr;
            });
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.lang === 'fr');
            });
        }
    });
 
    /* ── Scroll-reveal for .fade-in elements ── */
    function animateOnScroll() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 120) {
                el.classList.add('visible');
            }
        });
    }
 
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
 
})();
 