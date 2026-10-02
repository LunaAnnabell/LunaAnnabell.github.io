document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const previousButton = carousel.querySelector('[data-carousel-previous]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const status = carousel.querySelector('[data-carousel-status]');
    const caption = carousel.querySelector('[data-carousel-caption]');
    let currentIndex = 0;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== currentIndex;
        });
        status.textContent = `${currentIndex + 1} / ${slides.length}`;
        caption.textContent = slides[currentIndex].dataset.description || slides[currentIndex].alt;
    };

    previousButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            showSlide(currentIndex - 1);
        }
        if (event.key === 'ArrowRight') {
            showSlide(currentIndex + 1);
        }
    });

    showSlide(0);
});
