// Luxury Author Website - Premium Interactions
// Muhluri Sambo — Infinite Authority

// ============================
// REVEAL ANIMATIONS (defined at top level so all callbacks can access it)
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

    // Also reveal anything already in viewport
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
            el.classList.add('revealed');
        }
    });

    // Stagger children observers
    const staggerContainers = document.querySelectorAll('.stagger-children');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    staggerContainers.forEach(el => staggerObserver.observe(el));
}

// ============================
// PAGE LOADER — bulletproof dismissal
// ============================
function dismissLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (!pageLoader) return;
    pageLoader.classList.add('hidden');
    setTimeout(initAnimations, 100);
}

// Try on load event, but always fall back after 2.5s max
window.addEventListener('load', () => {
    setTimeout(dismissLoader, 600);
});

// Hard timeout fallback: if load never fires (e.g. a static asset 404s),
// dismiss after 2.5 seconds so the site is never permanently stuck.
setTimeout(dismissLoader, 2500);

// ============================
// DOM READY
// ============================
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // SCROLL PROGRESS INDICATOR
    // ============================
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
    }, { passive: true });

    // ============================
    // NAVIGATION BEHAVIOR
    // ============================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let navTicking = false;

    if (navbar) {
        navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease, box-shadow 0.4s ease';

        window.addEventListener('scroll', () => {
            if (navTicking) return;
            window.requestAnimationFrame(() => {
                const currentScroll = window.scrollY;

                navbar.classList.toggle('scrolled', currentScroll > 100);

                if (currentScroll > lastScroll && currentScroll > 500) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                navTicking = false;
            });
            navTicking = true;
        }, { passive: true });
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
            mobileMenu.classList.toggle('open', isMenuOpen);
            menuIcon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.remove('open');
                menuIcon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });
    }

    // ============================
    // PARALLAX EFFECT FOR SECTION NUMBERS
    // ============================
    const sectionNumbers = document.querySelectorAll('.section-number');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        sectionNumbers.forEach((num, index) => {
            const speed = 0.5 + (index * 0.1);
            num.style.transform = `translateY(${-(scrolled * speed * 0.05)}px)`;
        });
    }, { passive: true });

    // ============================
    // MAGNETIC BUTTON EFFECT
    // ============================
    if (!window.matchMedia('(pointer: coarse)').matches) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
                btn.style.transform = `translate(${x}px, ${y}px)`;
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
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================
    // CONTACT FORM HANDLING
    // ============================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (formSuccess) formSuccess.classList.add('hidden');
            if (formError) formError.classList.add('hidden');

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline-block mr-2"></i> Sending...';
            submitBtn.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            const payload = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                message: document.getElementById('message')?.value || '',
            };

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    if (formSuccess) formSuccess.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    if (formError) {
                        formError.textContent = data.error || 'Failed to send message. Please try again.';
                        formError.classList.remove('hidden');
                    }
                }
            } catch (err) {
                console.error('Form error:', err);
                if (formError) {
                    formError.textContent = 'Network error. Please check your connection and try again.';
                    formError.classList.remove('hidden');
                }
            } finally {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    // ============================
    // BOOK CARDS ENHANCED HOVER
    // ============================
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-10px)'; });
        card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });
    });

    // ============================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('text-gold', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    // ============================
    // PARALLAX IMAGES (Subtle)
    // ============================
    const parallaxImages = document.querySelectorAll('.parallax-wrapper img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${(scrolled - img.offsetTop) * 0.05}px)`;
            }
        });
    }, { passive: true });

    // ============================
    // CUSTOM CURSOR (desktop only)
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

        let cursorX = 0, cursorY = 0, currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        (function animateCursor() {
            currentX += (cursorX - currentX) * 0.1;
            currentY += (cursorY - currentY) * 0.1;
            cursor.style.left = (currentX - 10) + 'px';
            cursor.style.top = (currentY - 10) + 'px';
            requestAnimationFrame(animateCursor);
        })();

        document.querySelectorAll('a, button, .book-card').forEach(el => {
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

    console.log('🎩 Muhluri Sambo — Infinite Authority\n🌐 Website initialized with premium interactions');
});