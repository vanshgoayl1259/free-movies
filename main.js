document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Carousel Scrolling
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if(prevBtn && nextBtn && carousel) {
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -300, behavior: 'smooth' });
            });
        }
    });
});
