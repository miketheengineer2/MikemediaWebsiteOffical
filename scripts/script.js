document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('backdrop');

    if (menuButton && mobileMenu && backdrop) {
        let isMenuOpen = false;

        const openMenu = () => {
            isMenuOpen = true;
            menuButton.classList.add('active');
            mobileMenu.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            isMenuOpen = false;
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuButton.addEventListener('click', () => {
            if (isMenuOpen) closeMenu();
            else openMenu();
        });

        backdrop.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen) closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && isMenuOpen) closeMenu();
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Function to show the next slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    // Function to advance to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide initially
    showSlide(0);

    // Set interval for automatic sliding (every 3 seconds)
    setInterval(nextSlide, 3000);
});