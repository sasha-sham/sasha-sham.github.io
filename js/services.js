document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');

    function renderService(service) {
        return `
        <section class="service-card">
            <div class="service-header">
                <h2>${service.title}</h2>
                <a href="#" class="more-info">Подробнее...</a>
            </div>
            <div class="service-content">
                <div class="service-images">
                    ${service.images.map(img => `
                        <img src="${img.src}" alt="${img.alt}">
                    `).join('')}
                </div>
                <div class="service-details">
                    <p>${service.description}</p>
                    <div class="price-tag">
                        <span>от ${service.price.toFixed(2)} руб.</span>
                    </div>
                </div>
            </div>
        </section>`;
    }

    // Render all services
    mainContainer.innerHTML = servicesData.map(service => renderService(service)).join('') +
        `<div class="contact-info">
            <p>Для записи и дополнительной информации:</p>
            <p><a href="tel:+375298157831">+375 29 815 78 31</a></p>
            <p>пр-т Строителей 11/А, БЦ "Омега", к.208, Витебск</p>
        </div>`;
});
