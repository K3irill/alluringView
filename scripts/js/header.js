const headerSettingsBtn = document.getElementById("headerSettingsBtn");
const searchForm = document.getElementById("header-search-form");
const searchImg = document.getElementById("header-search-img");
const searchClearInput = document.getElementById("search-empty-input");
const headerSearchInpit = document.getElementById("search-input");

searchImg.addEventListener("click", () => {
  searchForm.classList.toggle("header__part_search-form-active");
});
searchClearInput.addEventListener("click", (e) => {
  e.preventDefault();
  headerSearchInpit.value = "";
});
searchClearInput.addEventListener("dblclick", (e) => {
  e.preventDefault();
  searchForm.classList.toggle("header__part_search-form-active");
});
