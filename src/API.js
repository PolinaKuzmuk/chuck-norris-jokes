import { createCategoryButton } from "./render.js";

const BASE_URL = "https://api.chucknorris.io/jokes/";

async function getCategoryList() {
  await fetch(`${BASE_URL}categories`)
    .then((res) => res.json())
    .then((res) => createCategoryButton(res));
}

async function fetchJokeByQuery(searchQuery) {
  return await fetch(`${BASE_URL}${searchQuery}`)
    .then((res) => res.json());
}

export { BASE_URL, getCategoryList, fetchJokeByQuery };
