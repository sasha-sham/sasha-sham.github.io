document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    const navLinks = document.querySelectorAll('.nav-button');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navButtons.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navButtons.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-buttons') && 
            !event.target.closest('.menu-toggle') && 
            navButtons.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navButtons.classList.remove('active');
        }
    });
});
