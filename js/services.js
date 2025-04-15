document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');

    // Create modal elements for image preview
    const imagePreviewModal = document.createElement('div');
    imagePreviewModal.className = 'image-preview-modal';
    imagePreviewModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="preview-image" src="" alt="Preview">
            <div class="image-navigation">
                <button class="prev-image">&#10094;</button>
                <button class="next-image">&#10095;</button>
            </div>
        </div>
    `;
    document.body.appendChild(imagePreviewModal);

    // Get modal elements
    const modalImage = imagePreviewModal.querySelector('.preview-image');
    const closeButton = imagePreviewModal.querySelector('.close-modal');
    const prevButton = imagePreviewModal.querySelector('.prev-image');
    const nextButton = imagePreviewModal.querySelector('.next-image');

    // Current preview state
    let currentImages = [];
    let currentIndex = 0;

    // Close modal when clicking close button or outside the modal content
    closeButton.addEventListener('click', closeModal);
    imagePreviewModal.addEventListener('click', (e) => {
        if (e.target === imagePreviewModal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Navigation buttons
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    function showPrevImage() {
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updatePreviewImage();
    }

    function showNextImage() {
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updatePreviewImage();
    }

    function updatePreviewImage() {
        if (currentImages.length > 0) {
            const currentImage = currentImages[currentIndex];
            modalImage.src = currentImage.src;
            modalImage.alt = currentImage.alt;
            
            // Show/hide navigation buttons based on number of images
            prevButton.style.display = currentImages.length > 1 ? 'block' : 'none';
            nextButton.style.display = currentImages.length > 1 ? 'block' : 'none';
        }
    }

    function openModal(images, index) {
        currentImages = images;
        currentIndex = index;
        updatePreviewImage();
        imagePreviewModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
    }

    function closeModal() {
        imagePreviewModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    function renderService(service) {
        const hasAdditionalInfo = service.additionalInfo ? true : false;
        
        return `
        <section class="service-card">
            <div class="service-header">
                <h2>${service.title}</h2>
                ${hasAdditionalInfo ? 
                    `<a href="#" class="more-info" data-service="${service.title}">Подробнее...</a>` : 
                    ''}
            </div>
            <div class="service-content">
                <div class="service-images">
                    ${service.images.map((img, index) => `
                        <img src="${img.src}" alt="${img.alt}" class="preview-trigger" data-service="${service.title}" data-index="${index}">
                    `).join('')}
                </div>
                <div class="service-details">
                    <p>${service.description}</p>
                    <div class="price-tag">
                        <span>от ${service.price.toFixed(2)} руб.</span>
                    </div>
                </div>
            </div>
            ${hasAdditionalInfo ? `
            <div class="additional-info" id="info-${service.title.replace(/\s+/g, '-').toLowerCase()}">
                <div class="additional-info-content">
                    ${service.additionalInfo.details ? `<p class="details">${service.additionalInfo.details}</p>` : ''}
                    
                    ${service.additionalInfo.includes ? `
                    <div class="includes">
                        <h3>Включено:</h3>
                        <ul>
                            ${service.additionalInfo.includes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                    
                    ${service.additionalInfo.schedule ? `
                    <div class="schedule">
                        <h3>Расписание:</h3>
                        <p>${service.additionalInfo.schedule}</p>
                    </div>` : ''}
                    
                    ${service.additionalInfo.requirements ? `
                    <div class="requirements">
                        <h3>Требования:</h3>
                        <p>${service.additionalInfo.requirements}</p>
                    </div>` : ''}
                </div>
            </div>` : ''}
        </section>`;
    }

    // Render all services
    mainContainer.innerHTML = servicesData.map(service => renderService(service)).join('') +
        `<div class="contact-info">
            <p>Для записи и дополнительной информации:</p>
            <p><a href="tel:+375298157831">+375 29 815 78 31</a></p>
            <p>пр-т Строителей 11/А, БЦ "Омега", к.208, Витебск</p>
        </div>`;
        
    // Add click event listeners for "Подробнее..." buttons
    document.querySelectorAll('.more-info').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceTitle = this.getAttribute('data-service');
            const infoId = `info-${serviceTitle.replace(/\s+/g, '-').toLowerCase()}`;
            const infoPanel = document.getElementById(infoId);
            
            if (infoPanel) {
                const isActive = infoPanel.classList.contains('active');
                
                if (isActive) {
                    infoPanel.classList.remove('active');
                    this.textContent = 'Подробнее...';
                } else {
                    infoPanel.classList.add('active');
                    this.textContent = 'Скрыть...';
                    infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
    
    // Add click event listeners to all service images
    document.querySelectorAll('.preview-trigger').forEach(img => {
        img.addEventListener('click', function() {
            const serviceTitle = this.getAttribute('data-service');
            const imageIndex = parseInt(this.getAttribute('data-index'));
            
            // Find the service with matching title
            const service = servicesData.find(s => s.title === serviceTitle);
            if (service && service.images) {
                openModal(service.images, imageIndex);
            }
        });
    });
});
