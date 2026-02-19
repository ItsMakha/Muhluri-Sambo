// Luxury Author Website - Premium Interactions
// Muhluri Sambo — Infinite Authority

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================
    // PAGE LOADER
    // ============================
    const pageLoader = document.getElementById('pageLoader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            // Trigger initial animations after loader
            setTimeout(initAnimations, 100);
        }, 800);
    });
    
    // ============================
    // SCROLL PROGRESS INDICATOR
    // ============================
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
    
    // ============================
    // NAVIGATION BEHAVIOR
    // ============================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
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
    
    // ============================
    // MOBILE MENU
    // ============================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = document.getElementById('menuIcon');
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open');
        
        if (isMenuOpen) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
    
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
    // CONTACT FORM HANDLING
    // ============================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.remove('hidden');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
    
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
    // SCROLL TRIGGERED NAVBAR VISIBILITY
    // ============================
    let ticking = false;
    
    function updateNavbar() {
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
            const sectionHeight = section.clientHeight;
            
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
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#E2B13C';
            });
        });
    }
    
    // ============================
    // PERFORMANCE: RAF FOR SMOOTH ANIMATIONS
    // ============================
    let rafId = null;
    let scrollCallbacks = [];
    
    function onScroll(callback) {
        scrollCallbacks.push(callback);
    }
    
    function loop() {
        scrollCallbacks.forEach(cb => cb());
        rafId = requestAnimationFrame(loop);
    }
    
    // Start loop
    loop();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    });
    
    console.log('🎩 Muhluri Sambo — Infinite Authority\n🌐 Website initialized with premium interactions');
});