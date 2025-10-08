document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('events-container');
    const emptyMessage = document.querySelector('.events-empty');
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Get Russian month name
    function getMonthName(monthIndex) {
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        return months[monthIndex];
    }
    
    // Format date to display in Russian format
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    
    // Check if event is in the past
    function isEventPast(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(dateString);
        return eventDate < today;
    }
    
    // Create modal for event details
    const eventDetailsModal = document.createElement('div');
    eventDetailsModal.className = 'event-details-modal';
    eventDetailsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(eventDetailsModal);
    
    const modalClose = eventDetailsModal.querySelector('.close-modal');
    const modalBody = eventDetailsModal.querySelector('.modal-body');
    
    modalClose.addEventListener('click', () => {
        eventDetailsModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    eventDetailsModal.addEventListener('click', (e) => {
        if (e.target === eventDetailsModal) {
            eventDetailsModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Show event details modal
    function showEventDetails(eventId) {
        const event = eventsData.find(e => e.id === eventId);
        if (!event) return;
        
        let detailsHTML = `
            <h2>${event.title}</h2>
            <p class="event-date-time">${formatDate(event.date)} ${event.time}</p>
            <div class="event-description">${event.description}</div>
            <ul class="event-details-list">
                ${event.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            <div class="event-price-details">Стоимость: ${event.price.toFixed(2)} руб.</div>
            <div class="event-location-details">Место: ${event.location}</div>
            <button class="register-button">Записаться</button>
        `;
        
        modalBody.innerHTML = detailsHTML;
        eventDetailsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add event listener to registration button in modal
        const registerButton = modalBody.querySelector('.register-button');
        registerButton.addEventListener('click', function() {
            alert(`Спасибо за интерес к событию "${event.title}"! Для записи, пожалуйста, свяжитесь с нами по телефону +375 29 815 78 31 или через Instagram @sasha_sham_dubinkina.`);
        });
    }
    
    // Render a single event card
    function renderEventCard(event) {
        const isPast = isEventPast(event.date);
        const eventDate = new Date(event.date);
        const displayDate = `${eventDate.getDate()} ${getMonthName(eventDate.getMonth())}`;
        
        // Translate category to Russian
        let categoryText;
        switch (event.category) {
            case 'masterclass':
                categoryText = 'Мастер-класс';
                break;
            case 'party':
                categoryText = 'Арт-вечеринка';
                break;
            case 'children':
                categoryText = 'Для детей';
                break;
            default:
                categoryText = 'Событие';
        }
        
        return `
            <div class="event-card ${isPast ? 'past-event' : ''} ${event.featured ? 'featured' : ''}" data-category="${event.category}" data-date="${event.date}" data-id="${event.id}">
                <div class="event-category">${categoryText}</div>
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <div class="event-date">${displayDate}</div>
                    <div class="event-time">${event.time}</div>
                    <div class="event-price">${event.price.toFixed(2)} руб.</div>
                </div>
            </div>
        `;
    }
    
    // Filter events based on category and date
    function filterEvents(category) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let filteredEvents = [];
        
        if (category === 'all') {
            const todayCopy = new Date(today);
            const upcoming = eventsData
                .filter(event => new Date(event.date) >= todayCopy)
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first
            const past = eventsData
                .filter(event => new Date(event.date) < todayCopy)
                .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent past first
            filteredEvents = [...upcoming, ...past];
        } else if (category === 'upcoming') {
            filteredEvents = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today;
            });
        } else {
            // Only upcoming for specific categories
            filteredEvents = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                return event.category === category && eventDate >= today;
            });
        }
        
        // Sort events by date (closest first) for non-'all' categories
        if (category !== 'all') {
            filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        // Display events or empty message
        if (filteredEvents.length > 0) {
            eventsContainer.innerHTML = filteredEvents.map(event => renderEventCard(event)).join('');
            emptyMessage.style.display = 'none';
        } else {
            eventsContainer.innerHTML = '';
            emptyMessage.style.display = 'block';
        }
        
        // Add click event listeners to event cards
        addEventCardListeners();
    }
    
    // Add click event listeners to event cards
    function addEventCardListeners() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            card.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                showEventDetails(eventId);
            });
        });
    }
    
    // Add filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            const filterCategory = this.getAttribute('data-filter');
            filterEvents(filterCategory);
        });
    });
    
    // Initial render - show upcoming events by default
    filterEvents('upcoming');
    
    // If hash exists in URL, scroll to that event
    if (window.location.hash) {
        const eventId = window.location.hash.substring(1);
        setTimeout(() => {
            const eventElement = document.querySelector(`[data-id="${eventId}"]`);
            if (eventElement) {
                eventElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
});
