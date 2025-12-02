document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(projectCards).indexOf(card);

                // Stagger delay: 100ms * index
                setTimeout(() => {
                    card.classList.add('project-visible');
                }, index * 100);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });
});
