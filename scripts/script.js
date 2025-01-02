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

  
    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.querySelector('.slider');
        const slides = slider.querySelectorAll('img');
        let currentIndex = 0;
    
        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
    
        const autoSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        };
    
        setInterval(autoSlide, 3000); // Slides change every 3 seconds
    });