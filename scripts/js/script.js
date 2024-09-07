const wrapper = document.querySelector(".wrapper");
const headerSettingsBtn = document.getElementById("headerSettingsBtn");
const headerSettingsMenu = document.getElementById("headerSettings-menu");

function openHeaderSettings(params) {
  headerSettingsMenu.classList.toggle("hidden");
}
headerSettingsBtn.addEventListener("click", () => openHeaderSettings());

const changeBtn = document.querySelector(".theme-wrap");
const themeSpan = document.querySelector(".theme");
const pageSectionTitle = document.querySelectorAll(".pageSection__title");

function changePositionSpan(params) {
  changeBtn.classList.toggle("theme-end");
  themeSpan.classList.toggle("theme_light");
  wrapper.classList.toggle("theme_light");

  pageSectionTitle.forEach((el) => {
    el.classList.toggle("title_dark");
  });
}
changeBtn.addEventListener("click", () => changePositionSpan());

const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const textResult = document.getElementById("result");

var falling = true;

TweenLite.set("#wrapper", { perspective: 600 });
TweenLite.set(".dot", { xPercent: "-50%", yPercent: "-50%" });

var total = 30;
var container = document.getElementById("wrapper"),
  w = window.innerWidth,
  h = (window.innerHeight = 3000);

for (let i = 0; i < total; i++) {
  var Div = document.createElement("div");
  TweenLite.set(Div, {
    attr: { class: "dot" },
    x: R(0, w),
    y: R(-200, -150),
    z: R(-200, 200),
  });
  container.appendChild(Div);
  animm(Div);
}

function animm(elm) {
  TweenMax.to(elm, R(20, 35), {
    y: h + 100,
    ease: Linear.easeNone,
    repeat: -1,
    delay: 0,
  });
  TweenMax.to(elm, R(4, 8), {
    x: "+=100",
    rotationZ: R(0, 180),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
  });
  TweenMax.to(elm, R(2, 8), {
    rotationX: R(0, 360),
    rotationY: R(0, 360),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
    delay: -5,
  });
}

function R(min, max) {
  return min + Math.random() * (max - min);
}

const bigBannerIBG = document.querySelector(".bigBanner_ibg");

const bannerImgUrls = [
  "/img/index/banner/spirited.gif",
  "https://i.pinimg.com/originals/c4/f4/ab/c4f4ab6daec6f7ac60bfac99e1ed9286.jpg",
  "/img/index/banner/peace.jpg",
  "/img/index/banner/peace-1.jpg",
];

let currentImgUrl = 0;
const totalImgUrl = bannerImgUrls.length;

function changeBannerImg() {
  currentImgUrl = (currentImgUrl + 1) % totalImgUrl;
  bigBannerIBG.src = bannerImgUrls[currentImgUrl];
}

setInterval(() => {
  changeBannerImg();
}, 15000);
