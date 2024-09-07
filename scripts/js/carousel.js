"use strict";

const carouselBtnBack = document.querySelector(".pageSection__btn-back");
const carouselBtnNext = document.querySelector(".pageSection__btn-next");
const cards = document.querySelectorAll(".pageSection__card");
const carousel = document.querySelector(".carousel-conteiner");

// Клонируем карточки для бесконечной прокрутки
const cloneFirst = cards[0].cloneNode(true);
const cloneLast = cards[cards.length - 1].cloneNode(true);
carousel.appendChild(cloneFirst);
carousel.insertBefore(cloneLast, cards[0]);

const cardWidth =
  cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight, 10);

let currentOffset = -cardWidth;
carousel.style.transform = `translateX(${currentOffset}px)`;

const maxOffset = -(
  cardWidth * (cards.length)
);

function goNext() {
  if (currentOffset > maxOffset) {
    currentOffset -= cardWidth;
    carousel.style.transition = 'transform 0.3s ease';
    carousel.style.transform = `translateX(${currentOffset}px)`;
  } 
  if (currentOffset <= maxOffset) {
    setTimeout(() => {
      currentOffset = -cardWidth;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(${currentOffset}px)`;
    }, 300);
  }
}

function goBack() {
  if (currentOffset < 0) {
    currentOffset += cardWidth;
    carousel.style.transition = 'transform 0.3s ease';
    carousel.style.transform = `translateX(${currentOffset}px)`;
  } 
  if (currentOffset >= 0) {
    setTimeout(() => {
      currentOffset = maxOffset + cardWidth;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(${currentOffset}px)`;
    }, 300);
  }
}

carouselBtnNext.addEventListener("click", goNext);
carouselBtnBack.addEventListener("click", goBack);

let startX = 0;
let isDragging = false;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  
  carousel.style.transition = 'none';
  carousel.style.transform = `translateX(${currentOffset + diff}px)`;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  isDragging = false;

  if (diff < -50) {
    goNext(); 
  } else if (diff > 50) {
    goBack(); 
  } else {
    carousel.style.transition = 'transform 0.3s ease';
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }
});