// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {

    // ======== PART 1: RESPONSIVE NAVBAR (HAMBURGER MENU) ========
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle the .active class on the nav menu when hamburger is clicked
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        // Toggle the icon between bars (menu) and 'x' (close)
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close the menu when a link is clicked (good for one-page layout)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                // Reset icon to bars
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ======== PART 2: SCROLL ANIMATIONS (Intersection Observer) ========

    // Select all elements with the class 'animate-on-scroll'
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // Create the Intersection Observer instance
    const observer = new IntersectionObserver((entries) => {
        // Loop through the entries (the elements being watched)
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is visible on the screen, add the 'show' class
                entry.target.classList.add("show");
                
                // Stop observing the element so the animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the animation when 15% of the element is visible
        threshold: 0.15 
    });

    // Tell the observer to watch each of our animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ======== PART 3: CONTACT FORM SUBMISSION (Web3Forms Integration) ========
    
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the default page reload

        const data = new FormData(form);
        
        // Clear previous status messages
        formStatus.innerHTML = "Sending...";
        formStatus.style.color = "var(--primary-color)";
        
        try {
            // Send the form data to the Web3Forms endpoint defined in the HTML action attribute
            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formStatus.innerHTML = "Thanks! Your message has been sent.";
                formStatus.style.color = "green";
                form.reset(); // Clear the input fields
            } else {
                // Handle API error response
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