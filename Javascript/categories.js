
        // Search functionality
        const searchBar = document.querySelector('.search-bar');
        const searchBtn = document.querySelector('.search-btn');

        searchBtn.addEventListener('click', () => {
            const searchTerm = searchBar.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Implement search logic here
                showNotification(`Searching for "${searchTerm}"...`);
            }
        });

        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        // Category navigation
        function goToCategory(category) {
            showNotification(`Loading ${category} gifts...`);
            // Navigate to specific category page
            setTimeout(() => {
                window.location.href = `shop.html?category=${category}`;
            }, 500);
        }

        function goToRecipient(recipient) {
            showNotification(`Loading gifts for ${recipient}...`);
            // Navigate to specific recipient page
            setTimeout(() => {
                window.location.href = `shop.html?recipient=${recipient}`;
            }, 500);
        }

        function goToOffers() {
            showNotification('Loading special offers...');
            setTimeout(() => {
                window.location.href = 'shop.html?filter=offers';
            }, 500);
        }

        // Notification function
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                color: #333;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.5s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.category-card, .featured-card, .tag').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Add hover sound effect (optional)
        function playHoverSound() {
            // Add a subtle sound effect on hover
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl7yvDZjTkGHGzA7OOiUQ0PVqzn77BdGAg+ltryxnkpBCoAAAAA');
            audio.volume = 0.1;
            audio.play();
        }

        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
