document.querySelectorAll('.scattered-frame').forEach((frame) => {
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', 'Zoom artwork');

    const toggleZoom = () => {
        const isZoomed = frame.classList.toggle('is-zoomed');
        frame.setAttribute('aria-label', isZoomed ? 'Zoomed artwork, activate to reset' : 'Zoom artwork');
    };

    frame.addEventListener('click', toggleZoom);
    frame.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleZoom();
        }
        if (event.key === 'Escape') {
            frame.classList.remove('is-zoomed');
            frame.setAttribute('aria-label', 'Zoom artwork');
        }
    });
});
