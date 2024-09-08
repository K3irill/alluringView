export function posterAnimation() {
  const cardContainer = document.querySelector(".film-main-block__poster-wrap");
  const card = document.querySelector(".film-main-block__poster-container");

  if (cardContainer && card) {
    cardContainer.addEventListener("mousemove", (e) => {
      const cardWidth = cardContainer.offsetWidth;
      const cardHeight = cardContainer.offsetHeight;

      const centerX = cardContainer.offsetLeft + cardWidth / 2;
      const centerY = cardContainer.offsetTop + cardHeight / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = -(mouseY / (cardHeight / 2)) * 10;
      const rotateY = (mouseX / (cardWidth / 2)) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`;
    });

    cardContainer.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  }
}
