"use strict";
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
