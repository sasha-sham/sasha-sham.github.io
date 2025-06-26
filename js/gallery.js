// Gallery initialization
try {
    const gallery = document.getElementById('gallery');
    const images = [];
    let currentPage = 0;
    const imagesPerPage = 9; // 3x3 grid
    const totalPages = Math.ceil(GalleryData.totalImages / imagesPerPage);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentImageIndex = 0;
    
    // Update total pages counter in UI
    document.getElementById('total-pages').textContent = totalPages;
    
    // Validate and get image path
    function getImagePath(index) {
        if (!/^\d+$/.test(String(index)) || index < 1 || index > GalleryData.totalImages) {
            console.error('Invalid image index:', index);
            return null;
        }
        return `gallery/image-${String(index).padStart(3, '0')}.jpg`;
    }
    
    // Create gallery images for the current page
    function loadGalleryPage(pageIndex) {
        // Clear existing gallery items
        gallery.innerHTML = '';
        images.length = 0;
        
        // Calculate start and end indices for current page
        const startIndex = pageIndex * imagesPerPage + 1;
        const endIndex = Math.min(startIndex + imagesPerPage - 1, GalleryData.totalImages);
        
        for (let i = startIndex; i <= endIndex; i++) {
            const container = document.createElement('div');
            container.className = 'gallery-item-container';

            const img = document.createElement('img');
            const imagePath = getImagePath(i);
            if (!imagePath) continue;

            img.src = imagePath;
            img.className = 'gallery-item';
            img.dataset.index = i - 1;
            img.dataset.fullIndex = i;
            
            // Add click event for preview
            img.addEventListener('click', openLightbox);
            
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
        
        // Update current page number in UI
        document.getElementById('current-page').textContent = pageIndex + 1;
        
        // Update button states
        updateButtonStates();
    }

    // Lightbox functions
    function openLightbox(e) {
        const fullIndex = parseInt(e.target.dataset.fullIndex);
        if (isNaN(fullIndex) || fullIndex < 1 || fullIndex > GalleryData.totalImages) {
            console.error('Invalid image index:', fullIndex);
            return;
        }
        currentImageIndex = fullIndex;
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function updateLightboxImage() {
        const imagePath = getImagePath(currentImageIndex);
        if (!imagePath) {
            console.error('Failed to update lightbox image');
            return;
        }
        lightboxImg.src = imagePath;
    }
    
    // Handle clicks outside the image to close lightbox
    function handleLightboxClick(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    }
    
    // Function to update button states based on current page
    function updateButtonStates() {
        const prevButton = document.querySelector('.prev-page-button');
        const nextButton = document.querySelector('.next-page-button');
        
        // Disable prev button on first page
        prevButton.disabled = currentPage === 0;
        
        // Disable next button on last page
        nextButton.disabled = currentPage === totalPages - 1;
    }
    
    // Set up navigation buttons
    function setupNavigation() {
        const prevButton = document.querySelector('.prev-page-button');
        const nextButton = document.querySelector('.next-page-button');
        const closeButton = document.querySelector('.close-lightbox');
        
        prevButton.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                loadGalleryPage(currentPage);
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages - 1) {
                currentPage++;
                loadGalleryPage(currentPage);
            }
        });
        
        // Setup lightbox close button
        closeButton.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', handleLightboxClick);
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyPress);
    }
    
    // Handle keyboard navigation
    function handleKeyPress(e) {
        // Handle lightbox escape key
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
                return;
            }
        }
        
        // Handle gallery pagination
        if (e.key === 'ArrowLeft') {
            if (currentPage > 0) {
                currentPage--;
                loadGalleryPage(currentPage);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentPage < totalPages - 1) {
                currentPage++;
                loadGalleryPage(currentPage);
            }
        }
    }
    
    // Cleanup function for memory management
    function cleanup() {
        document.removeEventListener('keydown', handleKeyPress);
        lightbox.removeEventListener('click', handleLightboxClick);
        
        // Remove click listeners from images
        images.forEach(img => {
            img.removeEventListener('click', openLightbox);
        });
    }

    // Initialize gallery
    setupNavigation();
    loadGalleryPage(currentPage);

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
