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

    // Array of sold items (you can add more indices as needed)
    const soldItems = [1, 4, 5, 10, 12, 15, 16, 19, 23, 24, 25, 26, 27, 30, 35, 36, 37, 38, 39, 40, 41, 47, 48, 49, 52, 66, 75, 77, 78, 83, 87, 102, 109, 125, 127, 138, 139, 140, 142];

    // Array of items with AR content
    const arItems = [3, 4, 7, 8, 12, 20, 23, 27, 30, 32, 33, 34, 42, 43, 44, 45, 48, 51, 52, 56, 58, 61, 68, 75, 81, 102, 105, 106, 109, 110, 115, 116, 119, 120, 123, 126, 128, 130, 131, 136, 137, 138];

    // Create gallery images
    for (let i = 1; i <= totalImages; i++) {
        const container = document.createElement('div');
        container.className = 'gallery-item-container';

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

        // Add AR label to specific items
        if (arItems.includes(i)) {
            const arLabel = document.createElement('div');
            arLabel.className = 'ar-label';
            arLabel.textContent = 'AR';
            container.appendChild(arLabel);
        }

        // Check if the item is sold
        if (soldItems.includes(i)) {
            const soldOverlay = document.createElement('div');
            soldOverlay.className = 'sold-overlay';
            soldOverlay.textContent = 'Продано';
            container.appendChild(soldOverlay);
        }

        img.addEventListener('click', openLightbox);
        container.appendChild(img);
        gallery.appendChild(container);
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
