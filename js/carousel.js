"use strict";

const carouselBtnBack = document.querySelector(".pageSection__btn-back");
const carouselBtnNext = document.querySelector(".pageSection__btn-next");
const cards = document.querySelectorAll(".pageSection__card");
const carousel = document.querySelector(".carousel-conteiner");


const cardWidth =
  cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight, 10);
let currentOffset = 0; 

const maxOffset = -(
  cardWidth *
  (cards.length - Math.floor(carousel.offsetWidth / cardWidth))
);

carouselBtnNext.addEventListener("click", () => {
  if (currentOffset > maxOffset) {
    currentOffset -= cardWidth;
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }
});

carouselBtnBack.addEventListener("click", () => {
  if (currentOffset < 0) {
    currentOffset += cardWidth;
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }
});
