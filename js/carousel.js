"use strict";

const carouselBtnBack = document.querySelector('.pageSection__btn-back');
const carouselBtnNext = document.querySelector('.pageSection__btn-next');
const carousel = document.querySelector('.carousel-conteiner');
const cards = document.querySelectorAll('.pageSection__card');

// Рассчитаем ширину одной карточки + отступы
const cardWidth =
  cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight, 10);
let currentOffset = 0; // Текущий смещение карусели

// Максимальный допустимый сдвиг (сколько можно прокрутить)
const maxOffset = -(
  cardWidth *
  (cards.length - Math.floor(carousel.offsetWidth / cardWidth))
);

carouselBtnNext.addEventListener("click", () => {
  // Прокрутка вперед
  if (currentOffset > maxOffset) {
    currentOffset -= cardWidth;
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }
});

carouselBtnBack.addEventListener("click", () => {
  // Прокрутка назад
  if (currentOffset < 0) {
    currentOffset += cardWidth;
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }
});
