const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});

document.querySelectorAll('.scroll-reveal').forEach((element) => {
    observer.observe(element);
});
