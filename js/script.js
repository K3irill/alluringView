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



const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const textResult = document.getElementById("result");

function check(){
  if(input.value == ''){
    alert("Please input a value")
  }else{
let inputValue = input.value.toLowerCase();
  let newArr = [];

  inputValue.split('').forEach(el => {
    if(el !== ' ' && el == el.match(/[a-z]/)|| el !== ' ' && el == el.match(/[0-9]/)){
    newArr.push(el)
  }
})
console.log(newArr.join(''))
console.log(newArr.reverse().join(""))

  if(newArr.join("") == newArr.reverse().join("")){

    textResult.innerText = `${input.value} is a palindrome`
  }else {
    textResult.innerText = `${input.value} is not a palindrome`
  }

  }



}

button.addEventListener("click", check);
