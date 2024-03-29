import { returnToIndex, showCart, findStore, showVhsPlayers } from "./modules/header.mjs";
import { search } from "./modules/search.mjs";


let productName = document.getElementById("productName");
let productGenre = document.getElementById("productGenre");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", addToCart)
let uniqueProductPicture = document.getElementById("uniqueProductPicture");

let selectedMovieId = sessionStorage.getItem("sessionStorageId");


const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");


showCart()
returnToIndex()
findStore()
showVhsPlayers()

search(searchInput, apiKey)



printSelectedUniqueMovie(selectedMovieId);

function printSelectedUniqueMovie(selectedMovieId) {
    fetch("http://localhost:8080/api/v1/movie/" + selectedMovieId, {
        headers: {
            "api_key": "Leffes_api_nyckel",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(foundMovie => {

            console.log("Filmens ID " + foundMovie.id);

            productName.innerText = foundMovie.name;
            uniqueProductPicture.src = foundMovie.imageUrl;
            productGenre.innerText = foundMovie.category;
            productDescription.innerText = foundMovie.description;
            productPrice.innerText = foundMovie.price + " kr";
        })
}


function addToCart() {
    if (localStorage.getItem("itemsInCart") === null) {
        let itemsInCart = [];
        itemsInCart.push(selectedMovieId);
        localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))
        console.log("ahhhhhh" + itemsInCart);
    } else {
        let itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"))
        console.log("Detta låg i undvagnen innan klicket" + itemsInCart);
        itemsInCart.push(selectedMovieId);
        console.log("Nu ligger " + itemsInCart + " i kundvagnen");
        localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))

    }
}

