// Generic script for handling collapsible sections
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL and scroll to that element
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
            const targetElements = document.querySelectorAll(`[id^="${targetId}"]`);
            if (targetElements.length > 0) {
                targetElements[0].scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }

    // Find all cards that should be collapsible (on both about and index pages)
    const cardHeaders = document.querySelectorAll('.about-section h3');
  
    // Add click event to each header
    cardHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.about-section');
            card.classList.toggle('collapsed');
        });
      
        // By default, add collapsed class to all sections
        const card = header.closest('.about-section');
        card.classList.add('collapsed');
    });
});
