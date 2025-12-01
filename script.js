document.addEventListener("DOMContentLoaded", () => {

    // ======== PART 1: REMOVED BLOB CURSOR ANIMATION ========
    // (Custom cursor is fully removed for reliability.)

    // ======== PART 2: RESPONSIVE NAVBAR (HAMBURGER MENU) ========

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ... (your existing hamburger and navLinks code) ...

    // ======== NEW: CLOSE MENU ON CLICKING OUTSIDE ========
    document.addEventListener("click", (e) => {
        // Check if the menu is active AND
        // if the click was NOT on the hamburger OR inside the nav menu
        if (
            navMenu.classList.contains("active") &&
            !hamburger.contains(e.target) &&
            !navMenu.contains(e.target)
        ) {
            // If all true, close the menu
            navMenu.classList.remove("active");
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ======== PART 3: SCROLL ANIMATIONS (Intersection Observer) ========

    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ======== PART 4: CONTACT FORM SUBMISSION (Web3Forms Integration) ========

    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        formStatus.innerHTML = "Sending...";
        formStatus.style.color = "var(--primary-color)";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerHTML = "Thanks! Your message has been sent.";
                formStatus.style.color = "green";
                form.reset();
            } else {
                const result = await response.json();
                formStatus.innerHTML = `Oops! There was a problem: ${result.message || 'Unknown error'}`;
                formStatus.style.color = "red";
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.innerHTML = "Oops! There was a network error. Please try again later.";
            formStatus.style.color = "red";
        }
    });
    // ===== Clean Typewriter Restart on Page Load =====
    window.addEventListener('load', () => {
        const text = document.querySelector('.typewriter-text');
        if (text) {
            // restart animation smoothly
            text.style.animation = 'none';
            text.offsetHeight; // reflow trigger
            text.style.animation = null;
        }
    });


});

/* ========================================= */
/* ===== NEW PREMIUM ANIMATIONS JS ========= */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Create and Append Scroll-to-Top Button ---
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.id = "scroll-top-btn";
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollTopBtn);

    // Scroll to top logic
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- 2. Navbar & Scroll Button Visibility on Scroll ---
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar glass effect
        if (currentScroll > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Scroll button visibility
        if (currentScroll > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });

    // --- 3. Hero Section Initial Animation ---
    // Select hero elements to animate
    // Check for typing container to avoid overriding typewriter animation on the h1
    let heroTitle = document.querySelector(".typing-container");
    if (!heroTitle) {
        heroTitle = document.querySelector(".hero-content h1");
    }
    const heroSubtitle = document.querySelector(".hero-content h2"); // The typewriter container
    const heroDesc = document.querySelector(".hero-content p");
    const heroBtns = document.querySelector(".hero-cta-group");
    const heroSocials = document.querySelector(".hero-social-links");

    // Add classes with delays
    if (heroTitle) {
        heroTitle.classList.add("hero-animate-init");
    }
    if (heroSubtitle) {
        heroSubtitle.classList.add("hero-animate-init", "hero-delay-1");
    }
    if (heroDesc) {
        heroDesc.classList.add("hero-animate-init", "hero-delay-2");
    }
    if (heroBtns) {
        heroBtns.classList.add("hero-animate-init", "hero-delay-3");
    }
    if (heroSocials) {
        heroSocials.classList.add("hero-animate-init", "hero-delay-3");
    }

    // --- 4. Enhanced Scroll Reveal (Staggered) ---
    // We'll use a new observer for the staggered items

    const staggerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class
                entry.target.classList.add("reveal-visible");

                // Stop observing once revealed
                staggerObserver.unobserve(entry.target);
            }
        });
    }, staggerOptions);

    // Select elements to reveal
    const revealElements = document.querySelectorAll(
        ".project-card, .skill-pill, .info-card, .about-card, .section-title-new, .section-subtitle"
    );

    revealElements.forEach((el, index) => {
        // Add base hidden class
        el.classList.add("reveal-hidden");

        // Optional: Add manual stagger delays based on index within their container
        // This is a simple heuristic: if it has siblings, delay it based on index
        const parent = el.parentElement;
        if (parent) {
            const children = Array.from(parent.children).filter(child =>
                child.classList.contains("project-card") ||
                child.classList.contains("skill-pill") ||
                child.classList.contains("info-card")
            );
            const childIndex = children.indexOf(el);
            if (childIndex > 0) {
                el.style.transitionDelay = `${childIndex * 100}ms`;
            }
        }

        staggerObserver.observe(el);
    });

    // --- 5. Mobile Tap Feedback (for elements that don't have :active styles naturally) ---
    // This adds a quick class for JS-based touch feedback if needed, but CSS :active is usually enough.
    // We'll rely on the CSS :active styles added in style.css for performance.

});
