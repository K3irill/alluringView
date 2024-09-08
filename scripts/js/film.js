const cardContainer = document.querySelector('.film-main-block__poster-wrap');
const card = document.querySelector('.film-main-block__poster-container');

cardContainer.addEventListener('mousemove', (e) => {  
    const cardWidth = cardContainer.offsetWidth;
    const cardHeight = cardContainer.offsetHeight;

    const centerX = cardContainer.offsetLeft + cardWidth / 2;
    const centerY = cardContainer.offsetTop + cardHeight / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Изменяем знаки, чтобы карточка наклонялась в сторону курсора
    const rotateX = -(mouseY / (cardHeight / 2)) * 10; // Угол по оси X
    const rotateY = (mouseX / (cardWidth / 2)) * 10;  // Угол по оси Y

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`;  
});

cardContainer.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
});