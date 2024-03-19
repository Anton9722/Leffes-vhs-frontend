import { returnToIndex, showCart, findStore, showVhsPlayers } from "./modules/header.mjs";
import { search } from "./modules/search.mjs";


let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", addToCart)
let uniqueProductPicture = document.getElementById("uniqueProductPicture");

let selectedPlayerId = sessionStorage.getItem("sessionStorageId");


const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");


showCart()
returnToIndex()
findStore()
showVhsPlayers()

search(searchInput, apiKey)



printSelectedUniqueMovie(selectedPlayerId);

function printSelectedUniqueMovie(selectedPlayerId) {
    fetch("http://localhost:8080/api/v1/player/" + selectedPlayerId, {
        headers: {
            "api_key": "Leffes_api_nyckel",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(foundPlayer => {

            console.log("Spelarens ID " + foundPlayer.id);

            productName.innerText = foundPlayer.name;
            uniqueProductPicture.src = foundPlayer.imageUrl;
            productDescription.innerText = foundPlayer.description;
            productPrice.innerText = foundPlayer.price + " kr";
        })
}


function addToCart() {
    if (localStorage.getItem("itemsInCart") === null) {
        let itemsInCart = [];
        itemsInCart.push(selectedPlayerId);
        localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))
        console.log("ahhhhhh" + itemsInCart);
    } else {
        let itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"))
        console.log("Detta låg i undvagnen innan klicket" + itemsInCart);
        itemsInCart.push(selectedPlayerId);
        console.log("Nu ligger " + itemsInCart + " i kundvagnen");
        localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))
    }
}
