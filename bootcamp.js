/* ============================================================
   bootcamp.js — Relvox Bootcamp 2026
   ============================================================ */

(function () {
    'use strict';

    /* ── Day tab switcher ── */
    const dayTabs   = document.querySelectorAll('.bc-day-tab');
    const dayPanels = document.querySelectorAll('.bc-day-panel');

    function openDay(dayId) {
        dayPanels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', '');
        });
        dayTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });

        const targetPanel = document.getElementById('day-' + dayId);
        const targetTab   = document.querySelector('[data-day="' + dayId + '"]');

        if (targetPanel) {
            targetPanel.classList.add('active');
            targetPanel.removeAttribute('hidden');
        }
        if (targetTab) {
            targetTab.classList.add('active');
            targetTab.setAttribute('aria-selected', 'true');
        }

        // Animate criteria bars whenever schedule panel opens
        animateCriteriaInView();
    }

    // Remove hidden attr from active panel on load so it shows
    dayPanels.forEach(p => {
        if (!p.classList.contains('active')) p.setAttribute('hidden', '');
    });

    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => openDay(tab.dataset.day));
    });


    /* ── Outer FAQ wrapper toggle ── */
    const faqToggle = document.querySelector('.bc-faq__toggle');
    const faqInner  = document.getElementById('bc-faq-inner');

    if (faqToggle && faqInner) {
        faqToggle.addEventListener('click', () => {
            const isOpen = faqToggle.getAttribute('aria-expanded') === 'true';
            faqToggle.setAttribute('aria-expanded', String(!isOpen));
            faqInner.hidden = isOpen;

            // Close all individual questions when collapsing the whole panel
            if (isOpen) {
                document.querySelectorAll('.bc-faq-item__question').forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
                document.querySelectorAll('.bc-faq-item__answer').forEach(ans => {
                    ans.hidden = true;
                });
            }
        });
    }

    /* ── FAQ individual question accordion ── */
    const faqItems = document.querySelectorAll('.bc-faq-item');

    faqItems.forEach(item => {
        const btn    = item.querySelector('.bc-faq-item__question');
        const answer = item.querySelector('.bc-faq-item__answer');

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            faqItems.forEach(other => {
                other.querySelector('.bc-faq-item__question').setAttribute('aria-expanded', 'false');
                other.querySelector('.bc-faq-item__answer').hidden = true;
            });

            // Toggle current
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
            }
        });
    });


    /* ── Criteria bar animation on scroll ── */
    function animateCriteriaInView() {
        document.querySelectorAll('.bc-criteria__fill').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                bar.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateCriteriaInView);
    // Also run once on load in case criteria are visible immediately
    setTimeout(animateCriteriaInView, 200);


    /* ── Scroll-reveal for .fade-in elements ── */
    // Extends the existing animateOnScroll from script.js;
    // runs the same logic in case bootcamp.js loads independently.
    function bcAnimateOnScroll() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 120) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', bcAnimateOnScroll);
    bcAnimateOnScroll(); // initial pass


    /* ── Default language: French ── */
    // Run on DOMContentLoaded so all elements are in the DOM
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof switchLanguage === 'function') {
            switchLanguage('fr');
        } else {
            // Fallback if script.js loads after bootcamp.js
            document.querySelectorAll('[data-en][data-fr]').forEach(el => {
                el.textContent = el.dataset.fr;
            });
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.lang === 'fr');
            });
        }
    });

})();