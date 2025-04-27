document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const totalImages = 66;
    createCarouselSlides(totalImages);
    setupCarouselNavigation(totalImages);
    document.getElementById('total-slides').textContent = totalImages;
    // Initialize IntersectionObserver for better lazy loading
    setupLazyLoading();
}

function createCarouselSlides(totalImages) {
    const container = document.querySelector('.carousel-container');
    
    for (let i = 1; i <= totalImages; i++) {
        const imageNumber = i.toString().padStart(3, '0');
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        // Create picture element for WebP support
        const picture = document.createElement('picture');
        
        // WebP source
        const sourceWebP = document.createElement('source');
        sourceWebP.srcset = generateSrcSet(imageNumber, 'webp');
        sourceWebP.type = 'image/webp';
        picture.appendChild(sourceWebP);
        
        // JPEG fallback with srcset
        const sourceJPG = document.createElement('source');
        sourceJPG.srcset = generateSrcSet(imageNumber, 'jpg');
        sourceJPG.type = 'image/jpeg';
        picture.appendChild(sourceJPG);
        
        // Actual img element (fallback)
        const img = document.createElement('img');
        img.src = `images/feedback/feedback-${imageNumber}-md.jpg`; // Medium size as default
        img.dataset.src = `images/feedback/feedback-${imageNumber}-md.jpg`; // For lazy loading
        img.alt = `Отзыв клиента ${i}`;
        img.loading = 'lazy'; // Native lazy loading as backup
        img.className = 'lazy-image';
        img.sizes = '(max-width: 500px) 95vw, (max-width: 768px) 80vw, 800px';
        
        picture.appendChild(img);
        slide.appendChild(picture);
        container.appendChild(slide);
    }
}

// Generate srcset for responsive images
function generateSrcSet(imageNumber, format) {
    return [
        `images/feedback/feedback-${imageNumber}-sm.${format} 400w`,
        `images/feedback/feedback-${imageNumber}-md.${format} 800w`,
        `images/feedback/feedback-${imageNumber}-lg.${format} 1200w`
    ].join(', ');
}

// Setup advanced lazy loading with IntersectionObserver
function setupLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load nearby images (preload next/previous)
                    const slideIndex = getSlideIndex(img);
                    preloadNearbyImages(slideIndex);
                    
                    // Unobserve once loaded
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',  // Start loading when 100px away
            threshold: 0.01 // Trigger when even 1% is visible
        });
        
        // Observe all lazy images
        document.querySelectorAll('.lazy-image').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Get the slide index of an image
function getSlideIndex(img) {
    const slide = img.closest('.carousel-slide');
    const container = slide.parentElement;
    return Array.from(container.children).indexOf(slide);
}

// Preload images near the current one
function preloadNearbyImages(currentIndex) {
    const totalImages = parseInt(document.getElementById('total-slides').textContent);
    const preloadIndexes = [
        (currentIndex + 1) % totalImages,
        (currentIndex + 2) % totalImages,
        (currentIndex - 1 + totalImages) % totalImages
    ];
    
    const slides = document.querySelectorAll('.carousel-slide');
    preloadIndexes.forEach(index => {
        const img = slides[index].querySelector('img');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}



function setupCarouselNavigation(totalImages) {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        goToSlide(currentIndex);
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        goToSlide(currentIndex);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Add swipe navigation for touch devices
    const carousel = document.querySelector('.feedback-carousel');
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            nextButton.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            prevButton.click();
        }
    }
}

function goToSlide(index) {
    const container = document.querySelector('.carousel-container');
    container.style.transform = `translateX(-${index * 100}%)`;
    document.getElementById('current-slide').textContent = index + 1;
    
    // Preload current and adjacent images
    preloadNearbyImages(index);
}




