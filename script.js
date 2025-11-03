// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {

    // ======== PART 1: RESPONSIVE NAVBAR (HAMBURGER MENU) ========
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle the .active class on the nav menu when hamburger is clicked
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close the menu when a link is clicked (good for one-page layout)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // ======== PART 2: SCROLL ANIMATIONS (Intersection Observer) ========

    // This is the modern, efficient way to detect when an element is in view
    
    // 1. Select all the elements we want to animate
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // 2. Create the observer
    const observer = new IntersectionObserver((entries) => {
        // 'entries' is an array of all elements being observed
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is on the screen, add the 'show' class
                entry.target.classList.add("show");
                
                // We can also stop observing it once it's shown
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    // 3. Tell the observer to watch each of our animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ======== PART 3: CONTACT FORM SUBMISSION (JavaScript part) ========
    // This part works with Step 4.
    
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the default form reload

        const data = new FormData(form);
        
        try {
            // Send the form data to our Web3Forms endpoint
            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                formStatus.innerHTML = "Thanks! Your message has been sent.";
                formStatus.style.color = "green";
                form.reset(); // Clear the form
            } else {
                // Error
                formStatus.innerHTML = "Oops! There was a problem sending your message.";
                formStatus.style.color = "red";
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.innerHTML = "Oops! There was a network error.";
            formStatus.style.color = "red";
        }
    });

});