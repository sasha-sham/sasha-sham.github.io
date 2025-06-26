// Gallery initialization
try {
    const gallery = document.getElementById('gallery');
    const images = [];

    // Validate and get image path
    function getImagePath(index) {
        if (!/^\d+$/.test(String(index)) || index < 1 || index > GalleryData.totalImages) {
            console.error('Invalid image index:', index);
            return null;
        }
        return `gallery/image-${String(index).padStart(3, '0')}.jpg`;
    }

    // Create gallery images
    for (let i = 1; i <= GalleryData.totalImages; i++) {
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
        if (GalleryData.hasArContent(i)) {
            const arLabel = document.createElement('div');
            arLabel.className = 'ar-label';
            arLabel.textContent = 'AR';
            container.appendChild(arLabel);
        }

        // Check if the item is sold
        if (GalleryData.isItemSold(i)) {
            const soldOverlay = document.createElement('div');
            soldOverlay.className = 'sold-overlay';
            soldOverlay.textContent = 'Продано';
            container.appendChild(soldOverlay);
        }

        // Add image to container
        container.appendChild(img);
        // Add container to gallery
        gallery.appendChild(container);
        // Store image reference
        images.push(img);


    }

    // No lightbox functionality

    // Cleanup function for memory management
    function cleanup() {
        // No event listeners to clean up
    }

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
