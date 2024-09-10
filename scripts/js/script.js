const wrapper = document.querySelector(".wrapper");

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
  "https://avatars.mds.yandex.net/i?id=d79ef4da83f4375f998e41fe4605dc65_l-7756406-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=47003c56ba0a8eb359f13dec653b4298_l-9243216-images-thumbs&n=13",
  "https://i.pinimg.com/originals/d0/8e/22/d08e22c2ee9d0e49d0310147997466a4.jpg",
];

let currentImgUrl = 0;
const totalImgUrl = bannerImgUrls.length;

function changeBannerImg() {
  currentImgUrl = (currentImgUrl + 1) % totalImgUrl;
  bigBannerIBG.src = bannerImgUrls[currentImgUrl];
}

setInterval(() => {
  changeBannerImg();
}, 25000);
