export function carousel() {
  const carouselBtnBack = document.querySelector("#ph-btn-back");
  const carouselBtnNext = document.querySelector("#ph-btn-next");
  const cards = document.querySelectorAll(".photo-item");
  const carousel = document.querySelector(".frames-container__picture-list");

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

export function carouselVideo() {
  const carouselBtnBackVd = document.querySelector("#vd-btn-back");
  const carouselBtnNextVd = document.querySelector("#vd-btn-next");
  const cardsVd = document.querySelectorAll(".frames-container__vido-item");
  const carouselVd = document.querySelector(".frames-container__video-list");

  const cardWidthVd =
    cardsVd[0].offsetWidth + parseInt(getComputedStyle(cardsVd[0]).marginRight, 10);

  const visibleWidthVd = carouselVd.offsetWidth;

  const totalWidthVd = cardWidthVd * cardsVd.length;

  const maxOffsetVd = -(totalWidthVd - visibleWidthVd);

  let currentOffsetVd = 0;

  function goNextVd() {
    if (currentOffsetVd - cardWidthVd <= maxOffsetVd) {
      currentOffsetVd = maxOffsetVd;
    } else {
      currentOffsetVd -= cardWidthVd;
    }

    carouselVd.style.transition = "transform 0.3s ease";
    carouselVd.style.transform = `translateX(${currentOffsetVd}px)`;
  }

  function goBackVd() {
    if (currentOffsetVd + cardWidthVd >= 0) {
      currentOffsetVd = 0;
    } else {
      currentOffsetVd += cardWidthVd;
    }

    carouselVd.style.transition = "transform 0.3s ease";
    carouselVd.style.transform = `translateX(${currentOffset}px)`;
  }

  carouselBtnNextVd.addEventListener("click", goNextVd);
  carouselBtnBackVd.addEventListener("click", goBackVd);

  let startXVd = 0;
  let isDraggingVd = false;

  carouselVd.addEventListener("touchstart", (e) => {
    startXVd = e.touches[0].clientX;
    isDraggingVd = true;
  });

  carouselVd.addEventListener("touchmove", (e) => {
    if (!isDraggingVd) return;

    const currentXVd = e.touches[0].clientX;
    const diffVd = currentXVd - startXVd;

    carousel.style.transition = "none";
    carousel.style.transform = `translateX(${currentOffset + diff}px)`;
  });

  carouselVd.addEventListener("touchend", (e) => {
    const endXVd = e.changedTouches[0].clientX;
    const diffVd = endXVd - startXVd;

    isDraggingVd = false;

    if (diffVd < -50) {
      goNextVd();
    } else if (diffVd > 50) {
      goBackVd();
    } else {
      carouselVd.style.transition = "transform 0.3s ease";
      carouselVd.style.transform = `translateX(${currentOffset}px)`;
    }
  });
}
