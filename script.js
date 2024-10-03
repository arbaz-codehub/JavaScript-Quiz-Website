document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    let lastScrollTop = 0;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            hamburger.style.transform = 'translateX(-20px) scale(0.8)';
        } else {
            // Scrolling up
            hamburger.style.transform = 'translateX(0) scale(1)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});