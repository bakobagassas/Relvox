
        // Language switching functionality
        let currentLang = 'fr'; // Default language
        
        function switchLanguage(lang) {
            currentLang = lang;
            
            // Update language switch buttons
            document.querySelectorAll('.lang-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.lang === lang) {
                    option.classList.add('active');
                }
            });
            
            // Update all translatable elements
            document.querySelectorAll('[data-en][data-fr]').forEach(element => {
                if (lang === 'en') {
                    element.textContent = element.dataset.en;
                } else {
                    element.textContent = element.dataset.fr;
                }
            });
        }
        
        // Language switch event listeners
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                switchLanguage(option.dataset.lang);
            });
        });

        // Smooth scrolling for navigation links
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

        // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const message = currentLang === 'en' 
                ? 'Thank you for your message! We will get back to you soon.' 
                : 'Merci pour votre message ! Nous vous répondrons bientôt.';
            alert(message);
            this.reset();
        });

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Get elements
        const writeMessageBtn = document.getElementById('writeMessageBtn');
        const contactForm = document.getElementById('contactForm');
        const closeFormBtn = document.getElementById('closeFormBtn');

        // Toggle form when "Write us a message" button is clicked
        writeMessageBtn.addEventListener('click', function() {
            if (contactForm.classList.contains('active')) {
                // Hide form if it's currently visible
                contactForm.classList.remove('active');
                setTimeout(() => {
                    contactForm.style.display = 'none';
                }, 300);
            } else {
                // Show form if it's currently hidden
                contactForm.style.display = 'block';
                // Small delay to allow display change before adding active class for smooth animation
                setTimeout(() => {
                    contactForm.classList.add('active');
                }, 10);
                
                // Scroll to form smoothly
                contactForm.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });

        // Optional: Hide form when clicking outside of it
        document.addEventListener('click', function(event) {
            if (contactForm.classList.contains('active') && 
                !contactForm.contains(event.target) && 
                !writeMessageBtn.contains(event.target)) {
                closeFormBtn.click();
            }
        });
        function openDay(dayId){

        document
            .querySelectorAll('.day-content')
            .forEach(day=>{
                day.classList.remove('active');
            });

        document
            .querySelectorAll('.day-btn')
            .forEach(btn=>{
                btn.classList.remove('active');
            });

        document
            .getElementById(dayId)
            .classList.add('active');

        event.target.classList.add('active');
    }

        // Handle form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully! (This is a demo)');
            // Here you would typically send the form data to your server
            
            // Reset form and hide it
            this.reset();
            closeFormBtn.click();
        });
    