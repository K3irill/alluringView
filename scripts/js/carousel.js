export function carousel() {
  const carouselBtnBack = document.querySelector(".frames-container__btn-back");
  const carouselBtnNext = document.querySelector(".frames-container__btn-next");
  const cards = document.querySelectorAll(".frames-container__photo-item");
  const carousel = document.querySelector(".frames-container__photo-list");

  const cardWidth =
    cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight, 10);

  const visibleWidth = carousel.offsetWidth;

  const totalWidth = cardWidth * cards.length;

  const maxOffset = -(totalWidth - visibleWidth);

  let currentOffset = 0;

  function goNext() {
    if (currentOffset - cardWidth <= maxOffset) {
      currentOffset = maxOffset;
    } else {
      currentOffset -= cardWidth;
    }

    carousel.style.transition = "transform 0.3s ease";
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }

  function goBack() {
    if (currentOffset + cardWidth >= 0) {
      currentOffset = 0;
    } else {
      currentOffset += cardWidth;
    }

    carousel.style.transition = "transform 0.3s ease";
    carousel.style.transform = `translateX(${currentOffset}px)`;
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

    carousel.style.transition = "none";
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
      carousel.style.transition = "transform 0.3s ease";
      carousel.style.transform = `translateX(${currentOffset}px)`;
    }
  });
}
