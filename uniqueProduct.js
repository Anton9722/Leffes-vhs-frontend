let uniqueProduct = document.getElementById("uniqueProduct");
let productName = document.getElementById("productName");
let productGenre = document.getElementById("productGenre");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", addToCart)
let uniqueProductPicture = document.getElementById("uniqueProductPicture");

let selectedMovieId = sessionStorage.getItem("sessionStorageId");

//************** BYT TILL RIKTIG CART-ARRAY ****************
let itemsInCart = [];
//************** BYT TILL RIKTIG CART-ARRAY ****************


// *************** BYT TILL RIKTIGT SESSION-ID******************
sessionStorage.setItem("sessionStorageId", 2)
// *************** BYT TILL RIKTIGT SESSION-ID******************


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
    itemsInCart.push(selectedMovieId);
    console.log("Har nu lagt till film med ID " + selectedMovieId + " i kundvagnen");
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart))
}