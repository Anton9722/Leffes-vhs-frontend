let uniqueProduct = document.getElementById("uniqueProduct");
let productName = document.getElementById("productName");
let productGenre = document.getElementById("productGenre");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", addToCart)
let uniqueProductPicture = document.getElementById("uniqueProductPicture");


function printSelectedUniqueMovie() {

    productName.innerText = "Leffes film"; //selectedMovie.name
    uniqueProductPicture.src = "https://img-cdn.sfanytime.com/COVERM/COVERM_88e88274-ef07-4f35-86f1-b79600b1d36a_sv.jpg?w=375&ar=0.692&fit=crop&fm=pjpg&s=ed93e17f20596aeb0498984357dcaa43"


    //****************************************  GET uniqueProductId istället för 1
    fetch("http://localhost:8080/api/v1/movie/1", {

        headers: {
            "api_key": "Leffes_api_nyckel",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            data.map(selectedMovie => {
                console.log("Filmens ID" + selectedMovie.id);

                productGenre.innerText = selectedMovie.category;
                productDescription.innerText = selectedMovie.description;
                productPrice.innerText = selectedMovie.price;


            })
        })
}

function addToCart() {



}

printSelectedUniqueMovie();