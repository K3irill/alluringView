const headerSettingsBtn = document.getElementById("headerSettingsBtn");
const searchForm = document.getElementById("header-search-form");
const searchImg = document.getElementById("header-search-img");
const searchClearInput = document.getElementById("search-empty-input");
const headerSearchInput = document.getElementById("search-input");
const btnSubmit = document.querySelector(".header__part_search-submit");
searchImg.addEventListener("click", () => {
  searchForm.classList.toggle("header__part_search-form-active");
  btnSubmit.classList.toggle("hidden");
});
searchClearInput.addEventListener("click", (e) => {
  e.preventDefault();
  headerSearchInput.value = "";
});
searchClearInput.addEventListener("dblclick", (e) => {
  e.preventDefault();
  searchForm.classList.toggle("header__part_search-form-active");
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Останавливает стандартную отправку формы

  let searchKeywords = headerSearchInput.value.trim(); // Получаем значение из поля поиска и убираем лишние пробелы
  console.log(searchKeywords);

  if (searchKeywords !== "") {
    // Если строка не пустая
    const searchUrl = `searchPage.html?keyword=${encodeURIComponent(
      searchKeywords
    )}`; // Кодируем ключевые слова для URL
    window.location.href = searchUrl; // Перенаправляем пользователя на новую страницу
  } else {
    alert("Введите ключевые слова для поиска."); // Если поле пустое, выводим сообщение
  }
});
