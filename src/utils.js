import { FAV_BLOCK, JOKES_BLOCK } from "./eventHandlers.js";
import { fetchJokeByQuery } from "./API.js";
import { renderJoke, showNoJokesMessage } from "./render.js";

function displayToggle(element) {
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

function isFavorite(obj, parentDiv) {
  if (parentDiv.className === "joke-list") {
    for (let index = 0; index < localStorage.length; index++) {
      const itemInStorage = localStorage.key(index);
      if (obj.id === itemInStorage) {
        const heartInMain = JOKES_BLOCK.querySelector(`[data-id="${obj.id}"] .heart`);
        heartInMain.src = "img/heart-full.svg";
      }
    }
  }
}

function getJoke(searchQuery) {
  fetchJokeByQuery(searchQuery).then((res) => {
    if (res.total === 0) {
      showNoJokesMessage();
    } else if (res.total > 0) {
      res.result.forEach((item) => renderJoke(item, JOKES_BLOCK));
    } else {
      renderJoke(res, JOKES_BLOCK);
    }
  });
}

function removeJoke(id) {
  const jokeInFavourite = FAV_BLOCK.querySelector(`[data-id="${id}"]`);
  jokeInFavourite.remove();
  localStorage.removeItem(id);
}

function clearList(list) {
  let children = list.children;
  Array.from(children).forEach((item) => item.remove());
}

export { displayToggle, isFavorite, getJoke, removeJoke, clearList };
