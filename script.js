import { search } from "./modules/search.mjs";
import{addToCart} from "./modules/addToCart.mjs"

let hs = document.getElementById("heroSection");

const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

search(searchInput, apiKey);

let bosse =document.createElement("button");
bosse.innerText = "test knapp";
bosse.addEventListener("click",()=>{
    addToCart(3);
})
hs.appendChild(bosse);



