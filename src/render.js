import { isFavorite } from "./utils.js";
import { FAV_BLOCK, JOKES_BLOCK, listenToClickOnHeart } from "./eventHandlers.js";

const categoryContainer = document.querySelector(".category-container");

function createCategoryButton(list) {
  list.forEach((item) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "category";
    input.id = `${item}`;
    input.value = item;
    input.classList.add("category-input");

    const label = document.createElement("label");
    label.htmlFor = `${item}`;
    label.textContent = item;
    label.classList.add("category-label");

    categoryContainer.appendChild(input);
    categoryContainer.appendChild(label);
  });
}

function renderJoke(obj, parentDiv) {
  const div = document.createElement("div");
  div.classList.add("joke-item");
  div.dataset.id = obj.id;
  parentDiv.appendChild(div);
  createHeart(obj, div, parentDiv);
  createMessageImg(div, parentDiv);
  createLink(div, obj);
  createJokeText(obj, div);
  createLastString(obj, div);
  isFavorite(obj, parentDiv);
}

function renderFavourite() {
  for (let index = 0; index < localStorage.length; index++) {
    const itemInLocalStorage = localStorage.key(index);
    if (itemInLocalStorage.includes("chuck_norris:")) {
      const joke = JSON.parse(localStorage.getItem(itemInLocalStorage));
      renderJoke(joke, FAV_BLOCK);
    }
  }
}

function createHeart(obj, div, parentDiv) {
  let heart = document.createElement("img");
  if (parentDiv.className === "favourite") {
    heart.src = "img/heart-full.svg";
  } else {
    heart.src = "img/heart-empty.svg";
  }
  heart.classList.add("heart");
  div.appendChild(heart);
  listenToClickOnHeart(obj, heart);
}

function createMessageImg(div, parentDiv) {
  const messageImg = document.createElement("img");
  if (parentDiv.className === "favourite") {
    messageImg.src = "img/message-dark.svg";
  } else {
    messageImg.src = "img/message-light.svg";
  }
  messageImg.classList.add("message");
  div.appendChild(messageImg);
}

function createLink(div, obj) {
  const wrap = document.createElement("div");
  div.appendChild(wrap);

  const p = document.createElement("p");
  p.classList.add("link-text");
  p.textContent = "ID: ";
  wrap.appendChild(p);

  const link = document.createElement("a");
  link.classList.add("link");
  link.href = obj.url;
  link.textContent = obj.id;
  p.appendChild(link);

  const linkImg = document.createElement("img");
  linkImg.classList.add("link-img");
  linkImg.src = "img/link-icon.svg";
  link.appendChild(linkImg);
}

function createJokeText(obj, div) {
  const p = document.createElement("p");
  p.classList.add("joke-text");
  p.innerHTML = obj.value;
  div.appendChild(p);
}

function createLastString(obj, div) {
  const lastString = document.createElement("div");
  lastString.classList.add("last-string");
  div.appendChild(lastString);

  createTimeUpdate(obj, lastString);
  if (obj.categories.length > 0) {
    createCategory(obj, lastString);
  }
}

function createCategory(obj, div) {
  const p = document.createElement("span");
  p.classList.add("category-joke");
  p.textContent = obj.categories;
  div.appendChild(p);
}

function createTimeUpdate(obj, div) {
  const today = new Date();
  const updateDay = new Date(obj.updated_at);
  const diff = today.getTime() - updateDay.getTime();
  const hours = diff / 3600000;

  const timeStamp = document.createElement("p");
  timeStamp.classList.add("time");
  timeStamp.innerHTML = `Last update: <span style='font-weight: 500;'>${Math.round(hours)} hours ago</span>`;
  div.appendChild(timeStamp);
}

function showNoJokesMessage() {
  const p = document.createElement("p");
  p.classList.add("no-jokes");
  p.textContent = "No jokes in this category.";
  JOKES_BLOCK.appendChild(p);
}

export { createCategoryButton, categoryContainer, renderJoke, renderFavourite, showNoJokesMessage };
