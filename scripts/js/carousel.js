function initializeCarousel({
  carouselSelector,
  itemSelector,
  btnBackSelector,
  btnNextSelector,
}) {
  const carousel = document.querySelector(carouselSelector);
  const items = document.querySelectorAll(itemSelector);
  const btnBack = document.querySelector(btnBackSelector);
  const btnNext = document.querySelector(btnNextSelector);

  const itemWidth =
    items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight, 10);
  const visibleWidth = carousel.offsetWidth;
  const totalWidth = itemWidth * items.length;
  const maxOffset = -(totalWidth - visibleWidth);

  let currentOffset = 0;

  function goNext() {
    currentOffset = currentOffset - itemWidth <= maxOffset ? maxOffset : currentOffset - itemWidth;
    updateCarouselPosition();
  }

  function goBack() {
    currentOffset = currentOffset + itemWidth >= 0 ? 0 : currentOffset + itemWidth;
    updateCarouselPosition();
  }

  function updateCarouselPosition() {
    carousel.style.transition = "transform 0.3s ease";
    carousel.style.transform = `translateX(${currentOffset}px)`;
  }

  btnNext.addEventListener("click", goNext);
  btnBack.addEventListener("click", goBack);

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
      updateCarouselPosition();
    }
  });
}

// Экспортируем функции для фото и видео карусели
export function initializePhotoCarousel() {
  initializeCarousel({
    carouselSelector: ".frames-container__picture-list",
    itemSelector: ".photo-item",
    btnBackSelector: "#ph-btn-back",
    btnNextSelector: "#ph-btn-next",
  });
}

export function initializeVideoCarousel() {
  initializeCarousel({
    carouselSelector: ".frames-container__video-list",
    itemSelector: ".frames-container__vido-item",
    btnBackSelector: "#vd-btn-back",
    btnNextSelector: "#vd-btn-next",
  });
}
