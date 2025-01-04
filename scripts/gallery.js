document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            const category = button.getAttribute('data-category');
            
            galleryItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                
                if (category === 'all' || category === itemCategory) {
                    item.classList.remove('hidden');
                    // Add staggered animation
                    item.style.animation = `slideUp 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.item-overlay').innerHTML;
            
            lightboxImage.src = imgSrc;
            lightboxCaption.innerHTML = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize with staggered animation
    galleryItems.forEach((item, index) => {
        item.style.animation = `slideUp 0.5s ease forwards ${index * 0.1}s`;
    });
});