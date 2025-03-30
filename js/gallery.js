// Gallery initialization
try {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const totalImages = 142;
    let currentImageIndex = 0;
    const images = [];

    // Validate and get image path
    function getImagePath(index) {
        if (!/^\d+$/.test(String(index)) || index < 1 || index > totalImages) {
            console.error('Invalid image index:', index);
            return null;
        }
        return `gallery/image-${String(index).padStart(3, '0')}.jpg`;
    }

    // Create gallery images
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        const imagePath = getImagePath(i);
        if (!imagePath) continue;

        img.src = imagePath;
        img.className = 'gallery-item';
        img.dataset.index = i - 1;
        
        // Add error handling for images
        img.onerror = function() {
            this.src = 'images/placeholder.jpg';
            this.alt = 'Image not found';
        };

        img.addEventListener('click', openLightbox);
        gallery.appendChild(img);
        images.push(img);
    }

    // Lightbox functions
    function openLightbox(e) {
        const index = parseInt(e.target.dataset.index);
        if (isNaN(index) || index < 0 || index >= totalImages) {
            console.error('Invalid image index:', index);
            return;
        }
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function updateLightboxImage() {
        const imagePath = getImagePath(currentImageIndex + 1);
        if (!imagePath) {
            console.error('Failed to update lightbox image');
            return;
        }
        lightboxImg.src = imagePath;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    }

    // Event listeners with cleanup function
    function addEventListeners() {
        document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        document.querySelector('.next-button').addEventListener('click', nextImage);
        document.querySelector('.prev-button').addEventListener('click', prevImage);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyPress);

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', handleLightboxClick);
    }

    function handleKeyPress(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    }

    function handleLightboxClick(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    }

    // Cleanup function for memory management
    function cleanup() {
        images.forEach(img => {
            img.removeEventListener('click', openLightbox);
        });
        document.removeEventListener('keydown', handleKeyPress);
        lightbox.removeEventListener('click', handleLightboxClick);
    }

    // Initialize event listeners
    addEventListeners();

    // Add cleanup on page unload
    window.addEventListener('unload', cleanup);

} catch (error) {
    console.error('Gallery initialization failed:', error);
    // Show a user-friendly error message
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.innerHTML = '<p>Sorry, the gallery is temporarily unavailable. Please try again later.</p>';
    }
}
