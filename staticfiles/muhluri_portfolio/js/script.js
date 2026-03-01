// Luxury Author Website - Premium Interactions
// Muhluri Sambo — Infinite Authority

// ============================
// GUARD AGAINST DOUBLE INITIALIZATION
// ============================
if (window.muhluriScriptLoaded) {
    console.log('Script already loaded, skipping...');
} else {
    window.muhluriScriptLoaded = true;
    console.log('🎩 Muhluri Sambo — Infinite Authority (first load)');

    document.addEventListener('DOMContentLoaded', () => {
        
        // ============================
        // PAGE LOADER
        // ============================
        const pageLoader = document.getElementById('pageLoader');
        
        // Use DOMContentLoaded + load event to ensure everything is ready
        if (pageLoader) {
            // Hide loader after everything is loaded
            window.addEventListener('load', () => {
                setTimeout(() => {
                    pageLoader.classList.add('hidden');
                    // Trigger initial animations after loader
                    setTimeout(initAnimations, 100);
                }, 800);
            });
            
            // Fallback: if load event already fired
            if (document.readyState === 'complete') {
                setTimeout(() => {
                    pageLoader.classList.add('hidden');
                    setTimeout(initAnimations, 100);
                }, 800);
            }
        }
        
        // ============================
        // SCROLL PROGRESS INDICATOR
        // ============================
        const scrollProgress = document.getElementById('scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            if (scrollProgress) {
                scrollProgress.style.width = scrollPercent + '%';
            }
        });
        
        // ============================
        // NAVIGATION BEHAVIOR
        // ============================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;
                
                // Add/remove scrolled class for background
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll direction (optional enhancement)
                if (currentScroll > lastScroll && currentScroll > 500) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
            
            // Smooth easing for navbar transform
            navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease, box-shadow 0.4s ease';
        }
        
        // ============================
        // MOBILE MENU
        // ============================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const menuIcon = document.getElementById('menuIcon');
        let isMenuOpen = false;
        
        if (mobileMenuBtn && mobileMenu && menuIcon) {
            mobileMenuBtn.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                mobileMenu.classList.toggle('open');
                
                if (isMenuOpen) {
                    menuIcon.setAttribute('data-lucide', 'x');
                } else {
                    menuIcon.setAttribute('data-lucide', 'menu');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
            
            // Close mobile menu on link click
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    isMenuOpen = false;
                    mobileMenu.classList.remove('open');
                    menuIcon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                });
            });
        }
        
        // ============================
        // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
        // ============================
        function initAnimations() {
            const revealElements = document.querySelectorAll('.reveal-text, .reveal-image');
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            revealElements.forEach(el => revealObserver.observe(el));
            
            // Stagger children observers
            const staggerContainers = document.querySelectorAll('.stagger-children');
            
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            staggerContainers.forEach(el => staggerObserver.observe(el));
        }
        
        // ============================
        // PARALLAX EFFECT FOR SECTION NUMBERS
        // ============================
        const sectionNumbers = document.querySelectorAll('.section-number');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            sectionNumbers.forEach((num, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed * 0.05);
                num.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // ============================
        // MAGNETIC BUTTON EFFECT
        // ============================
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        // Only apply on non-touch devices
        if (!window.matchMedia('(pointer: coarse)').matches) {
            magneticBtns.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                });
                
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0, 0)';
                });
            });
        }
        
        // ============================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offset = 80; // Account for fixed header
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // ============================
        // CONTACT FORM HANDLING - FIXED VERSION
        // ============================
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        const formError = document.getElementById('formError');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('✅ Form submission intercepted');
                
                // Hide previous messages
                if (formSuccess) formSuccess.classList.add('hidden');
                if (formError) formError.classList.add('hidden');
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</span>';
                submitBtn.disabled = true;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Get form data
                const name = document.getElementById('name')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const message = document.getElementById('message')?.value || '';
                
                console.log('📤 Sending data:', { name, email, message });
                
                try {
                    // IMPORTANT: Use trailing slash to match Django URL
                    const response = await fetch('/api/send-email/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify({ name, email, message }),
                    });
                    
                    console.log('📥 Response status:', response.status);
                    
                    const data = await response.json();
                    console.log('📦 Response data:', data);
                    
                    if (response.ok) {
                        // Success
                        if (formSuccess) {
                            formSuccess.classList.remove('hidden');
                        }
                        contactForm.reset();
                    } else {
                        // Error
                        if (formError) {
                            formError.textContent = data.error || 'Failed to send message. Please try again.';
                            formError.classList.remove('hidden');
                        }
                    }
                } catch (error) {
                    console.error('❌ Form submission error:', error);
                    if (formError) {
                        formError.textContent = 'Network error. Please check your connection and try again.';
                        formError.classList.remove('hidden');
                    }
                } finally {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
            
            console.log('✅ Contact form handler attached');
        }
        
        // ============================
        // BOOK CARDS ENHANCED HOVER
        // ============================
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // ============================
        // SCROLL TRIGGERED NAVBAR VISIBILITY (Optimized)
        // ============================
        let ticking = false;
        
        function updateNavbar() {
            if (!navbar) return;
            
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
        
        // ============================
        // PARALLAX IMAGES (Subtle)
        // ============================
        const parallaxImages = document.querySelectorAll('.parallax-wrapper img');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const speed = 0.05;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = (scrolled - img.offsetTop) * speed;
                    img.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
        
        // ============================
        // ACTIVE NAV LINK HIGHLIGHTING
        // ============================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-gold');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-gold');
                }
            });
        });
        
        // ============================
        // CURSOR ENHANCEMENT (Optional luxury touch)
        // ============================
        if (!window.matchMedia('(pointer: coarse)').matches) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border: 1px solid #E2B13C;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease, opacity 0.2s ease;
                mix-blend-mode: difference;
                opacity: 0.7;
                left: -20px;
                top: -20px;
            `;
            document.body.appendChild(cursor);
            
            let cursorX = 0;
            let cursorY = 0;
            let currentX = 0;
            let currentY = 0;
            
            document.addEventListener('mousemove', (e) => {
                cursorX = e.clientX;
                cursorY = e.clientY;
            });
            
            function animateCursor() {
                currentX += (cursorX - currentX) * 0.1;
                currentY += (cursorY - currentY) * 0.1;
                
                cursor.style.left = currentX - 10 + 'px';
                cursor.style.top = currentY - 10 + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
            
            // Hover states for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .book-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                    cursor.style.borderColor = '#0B2A4A';
                    cursor.style.opacity = '1';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = '#E2B13C';
                    cursor.style.opacity = '0.7';
                });
            });
        }
        
        console.log('🌐 Website initialized with premium interactions');
    });
}