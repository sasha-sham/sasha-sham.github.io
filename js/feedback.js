function createFeedbackCards() {
    const container = document.querySelector('.feedback-container');
    const totalImages = 18;

    for (let i = 1; i <= totalImages; i++) {
        const imageNumber = i.toString().padStart(3, '0');
        const article = document.createElement('article');
        article.className = 'feedback-card';

        const img = document.createElement('img');
        img.src = `images/feedback/feedback-${imageNumber}.jpg`;
        img.alt = 'Работа клиента';
        img.className = 'feedback-artwork';

        article.appendChild(img);
        container.appendChild(article);
    }
}

document.addEventListener('DOMContentLoaded', createFeedbackCards);
