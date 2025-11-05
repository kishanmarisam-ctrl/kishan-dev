document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // ======== PART 1: RESPONSIVE NAVBAR (HAMBURGER MENU) ========
    // ======================================================
    
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

    // ======================================================
    // ======== PART 2: GITHUB VIDEO ANIMATION ON HOVER ========
    // ======================================================
    
    const githubLink = document.querySelector('.hero-social-links a[aria-label="GitHub"]');
    const githubVideo = document.getElementById('github-icon-video');

    if (githubLink && githubVideo) {
        // --- Play on mouse enter (hover) ---
        githubLink.addEventListener('mouseenter', () => {
            githubVideo.style.opacity = 1;
            githubVideo.currentTime = 0; // Reset video to start
            githubVideo.play();
        });

        // --- Stop and hide on mouse leave (un-hover) ---
        githubLink.addEventListener('mouseleave', () => {
            githubVideo.style.opacity = 0;
            githubVideo.pause();
        });
        
        // --- Hide the video when it ends ---
        githubVideo.addEventListener('ended', () => {
             githubVideo.style.opacity = 0; 
        });
    }

    // ======================================================
    // ======== PART 3: SCROLL ANIMATIONS (GSAP ScrollTrigger) ========
    // (5 distinct animations replacing Intersection Observer)
    // ======================================================
    
    // 1. Register the plugin
    gsap.registerPlugin(ScrollTrigger);


    // --- Animation 1: Hero Section Entrance (Immediate Load Animation) ---
    // A clean, staggered entrance on page load.
    gsap.timeline()
        .from(".hero-content h1", { 
            y: 50, 
            opacity: 0, 
            duration: 0.8, 
            ease: "power3.out" 
        })
        .from(".hero-content p", { 
            y: 30, 
            opacity: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "<0.2") // Start 0.2s before the previous animation ends
        .from(".hero-cta-group a", { 
            scale: 0.9, 
            opacity: 0, 
            duration: 0.6, 
            stagger: 0.2, // Stagger buttons
            ease: "back.out(1.7)" 
        }, "<0.2")
        .from(".hero-social-links a", { 
            opacity: 0, 
            duration: 0.5, 
            y: 20, 
            stagger: 0.1 
        }, "<0.1");

    
    // --- Animation 2: Section Title Parallax/Zoom (on scroll) ---
    // Targets all h2 elements in page-sections.
    gsap.utils.toArray(".page-section h2").forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%", 
                end: "bottom 20%",
                scrub: 1, 
                toggleActions: "play none none reverse",
            }
        });
    });

    // --- Animation 3: About Section Staggered Card Entrance (on scroll) ---
    gsap.from(".about-grid .about-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            toggleActions: "play none none reverse",
        }
    });

    // --- Animation 4: Skills Section Entrance (Category Split - on scroll) ---
    gsap.from(".skill-category", {
        x: (i) => i % 2 === 0 ? -100 : 100, // Split animation
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
            toggleActions: "play none none reverse",
        }
    });
    
    // --- Animation 5: Projects Card Entrance (Slide and Fade - on scroll) ---
    gsap.from(".project-card", {
        y: 80,
        opacity: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: "back.out(1.2)", 
        scrollTrigger: {
            trigger: "#projects .project-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    // --- Bonus: Contact Form Entrance (on scroll) ---
    gsap.from(".contact-container", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
            toggleActions: "play none none reverse",
        }
    });

    // ======================================================
    // ======== PART 4: CONTACT FORM SUBMISSION (Web3Forms Integration) ========
    // ======================================================
    
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

});