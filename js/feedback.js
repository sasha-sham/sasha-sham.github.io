document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const totalImages = 28;
    createCarouselSlides(totalImages);
    setupCarouselNavigation(totalImages);
    document.getElementById('total-slides').textContent = totalImages;
}

function createCarouselSlides(totalImages) {
    const container = document.querySelector('.carousel-container');
    
    for (let i = 1; i <= totalImages; i++) {
        const imageNumber = i.toString().padStart(3, '0');
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = `images/feedback/feedback-${imageNumber}.jpg`;
        img.alt = `Отзыв клиента ${i}`;
        img.loading = 'lazy'; // Improve performance with lazy loading
        
        slide.appendChild(img);
        container.appendChild(slide);
    }
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
}


