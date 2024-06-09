import { displayToggle, getJoke, removeJoke, clearList } from "./utils.js";
import { categoryContainer, renderJoke } from "./render.js";

const MENU_BTN = document.querySelector(".favourite-menu-btn");
const MENU = document.querySelector(".menu");
const OVERLAY = document.querySelector(".overlay");
const FORM = document.querySelector(".form");
const FAV_BLOCK = document.querySelector(".favourite");
const JOKES_BLOCK = document.querySelector(".joke-list");
const searchInput = document.querySelector(".search-input");

MENU_BTN.addEventListener("click", () => {
  FAV_BLOCK.classList.toggle("favourite-hamburger");
  MENU.classList.toggle("menu-open");
  if (window.screen.width >= 768) {
    displayToggle(OVERLAY);
  }
  if (FAV_BLOCK.classList.contains("favourite-hamburger")) {
    MENU_BTN.style.backgroundImage = `url('img/fav-icon-close.svg')`;
  } else {
    MENU_BTN.style.backgroundImage = `url('img/fav-icon-menu.svg')`;
  }
});

FORM.addEventListener("click", (e) => {
  switch (e.target.value) {
    case "search":
      searchInput.style.display = "block";
      categoryContainer.style.display = "none";
      break;
    case "category":
      searchInput.style.display = "none";
      categoryContainer.style.display = "block";
      break;
    case "random":
      searchInput.style.display = "none";
      categoryContainer.style.display = "none";
      break;
    default:
      break;
  }
});

FORM.addEventListener("submit", (event) => {
  clearList(JOKES_BLOCK);
  const userChoise = document.querySelector("input:checked");
  event.preventDefault();
  switch (userChoise.value) {
    case "random":
      getJoke("random");
      break;
    case "category":
      const chosenCategory = categoryContainer.querySelector("input:checked");
      getJoke(`search?query=${chosenCategory.value}`);
      break;
    case "search":
      if (searchInput.value.length > 2) {
        getJoke(`search?query=${searchInput.value}`);
      }
      break;
    default:
      break;
  }
});

function listenToClickOnHeart(obj, heart) {
  heart.addEventListener("click", (_) => {
    if (heart.src.endsWith("heart-empty.svg")) {
      heart.src = "img/heart-full.svg";
      localStorage.setItem(`chuck_norris:${obj.id}`, JSON.stringify(obj));
      renderJoke({ ...obj, like: true }, FAV_BLOCK);
    } else {
      removeJoke(obj.id);
      const heartInMain = JOKES_BLOCK.querySelector(`[data-id="${obj.id}"] .heart`);
      if (heartInMain) {
        heartInMain.src = "img/heart-empty.svg";
      }
    }
  });
}

export { FAV_BLOCK, JOKES_BLOCK, listenToClickOnHeart };
