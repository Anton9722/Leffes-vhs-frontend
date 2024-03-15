import { returnToIndex, showCart, findStore } from "./modules/header.mjs";
import { search } from "./modules/search.mjs";


let productName = document.getElementById("productName");
let productGenre = document.getElementById("productGenre");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", addToCart)
let uniqueProductPicture = document.getElementById("uniqueProductPicture");

let selectedMovieId = sessionStorage.getItem("sessionStorageId");



// *************** BYT TILL RIKTIGT SESSION-ID******************
//sessionStorage.setItem("sessionStorageId", 2)
// *************** BYT TILL RIKTIGT SESSION-ID******************

const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");


showCart()
returnToIndex()
findStore()

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
            productPrice.innerText = foundMovie.price;
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




// function addToCart() {
//     let itemsInCartForReal = JSON.parse(localStorage.getItem("itemsInCartForReal"));
//     itemsInCartForReal = localStorage.getItem("itemsInCartForReal")
//     console.log("itemsInCartForReal = " + itemsInCartForReal);

//     if (itemsInCartForReal === null) {
//         console.log("itemsInCartForReal är jätteNull");
//         localStorage.setItem("itemsInCartForReal", JSON.stringify(selectedMovieId))
//         console.log("itemsInCartForReal är " + localStorage.getItem("itemsInCartForReal"));
//     } else {
//         console.log("itemsInCartForReal är inte Null utan itemsInCartForReal är: " + localStorage.getItem("itemsInCartForReal"));
//         itemsInCartForReal.push(selectedMovieId);
//         localStorage.setItem("itemsInCartForReal", JSON.stringify(itemsInCartForReal))

//     }



// console.log("Existerar jag" + itemsInCart);

// itemsInCart.push(selectedMovieId);
// console.log("Har nu lagt till film med ID " + selectedMovieId + " i kundvagnen");
// localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))
//}