import { search } from "./modules/search.mjs";

import {popularMovies} from "./modules/index.mjs";

import { addToCart } from "./modules/addToCart.mjs";
import { returnToIndex, showCart, findStore } from "./modules/header.mjs";

returnToIndex()
showCart()
findStore()



let heroSection = document.getElementById("heroSection");


const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

search(searchInput, apiKey);
popularMovies(apiKey);

let bosse = document.createElement("button");
bosse.innerText = "test knapp";
bosse.addEventListener("click", () => {
    addToCart(3);
})

heroSection.appendChild(bosse);

