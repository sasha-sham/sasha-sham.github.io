document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    const navLinks = document.querySelectorAll('.nav-button');
    let touchStartX = 0;
    let touchEndX = 0;

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

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();
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
