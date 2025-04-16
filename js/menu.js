document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    const navLinks = document.querySelectorAll('.nav-button');
    let touchStartX = 0;
    let touchEndX = 0;

    // Ensure buttons are clickable by adding click event listeners directly
    navLinks.forEach(function(button) {
        button.style.cursor = 'pointer';
    });

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Handle touch events for swipe
    navButtons.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, false);

    navButtons.addEventListener('touchmove', function(e) {
        if (!navButtons.classList.contains('active')) return;
        touchEndX = e.touches[0].clientX;
        const navContainer = document.querySelector('.nav-container');
        const diff = touchStartX - touchEndX;
        
        if (diff > 0) {
            navContainer.style.transform = `translateX(-${diff}px)`;
        }
    }, false);

    navButtons.addEventListener('touchend', function(e) {
        if (!navButtons.classList.contains('active')) return;
        const diff = touchStartX - touchEndX;
        
        if (diff > 70) { // If swiped more than 70px, close menu
            closeMenu();
        } else {
            // Reset position
            document.querySelector('.nav-container').style.transform = '';
        }
        touchStartX = 0;
        touchEndX = 0;
    }, false);

    // Enhanced click handling for mobile
    navLinks.forEach(link => {
        // Add both click and touchend events to ensure cross-platform compatibility
        ['click', 'touchend'].forEach(eventType => {
            link.addEventListener(eventType, function(e) {
                // Prevent any default behavior
                e.preventDefault();
                // Stop event propagation to prevent issues with parent containers
                e.stopPropagation();
                // Navigate to the link's href after closing the menu
                const href = this.getAttribute('href');
                closeMenu();
                // Wait a moment for the menu to close, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 50);
            }, { passive: false });
        });
    });

    // Close menu when clicking outside
    navButtons.addEventListener('click', function(e) {
        if (e.target === navButtons) {
            closeMenu();
        }
    });

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navButtons.classList.toggle('active');
        document.body.style.overflow = navButtons.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        navButtons.classList.remove('active');
        document.body.style.overflow = '';
        document.querySelector('.nav-container').style.transform = '';
    }
});
