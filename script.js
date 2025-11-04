document.addEventListener("DOMContentLoaded", () => {

    // ======== PART 1: REMOVED BLOB CURSOR ANIMATION ========
    // The custom cursor logic is removed for reliability.

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

});