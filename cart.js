import { returnToIndex, showCart, findStore, showVhsPlayers } from "./modules/header.mjs";
import { search, presentResult } from "./modules/search.mjs";


let order = document.getElementById("order");
let selectedProducts = document.getElementById("selectedProducts");
let buyBtn = document.getElementById("buyBtn");
let btnDiv = document.getElementById("btnDiv");
let priceText = document.getElementById("price")

const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

showCart()
returnToIndex()
findStore()
showVhsPlayers()
search(searchInput, apiKey);

let productsToBuy = localStorage.getItem("itemsInCart")
let moviesToBuy = JSON.parse(productsToBuy)


let buildCartFromTheseMovies = []
let totalPrice = 0;
moviesToBuy.forEach(element => {
    const headers = new Headers();
    headers.append("api_key", "Leffes_api_nyckel");

    fetch("http://localhost:8080/api/v1/movie/" + element, {
        headers: headers
    })
        .then(res => res.json())
        .then(data => {

            totalPrice += data.price;
            priceText.innerHTML = "ATT BETALA: " + totalPrice.toFixed(2) + " KR";
            console.log(totalPrice);
            buildCartFromTheseMovies.push(data);
            presentResult(buildCartFromTheseMovies)

        })
        .catch(error => {
            console.log("Error >>> ", error);
        })
});

let stripe = Stripe("pk_test_51OlqHVKQ2XHNRrsT7XkQ8t3bbWfzbfoOT66XnL6sAWEo1Az2V7y4xQuu9WTEZjbVuiFw7n31x6L3qoyH7I0geWAO00Jy3qJEIM");

buyBtn.addEventListener("click", function () {

    let moviesToStripe = [];
    let fetchPromises = [];

    for (let i = 0; i < moviesToBuy.length; i++) {
        const headers = new Headers();
        headers.append("api_key", "Leffes_api_nyckel");

        const promise = fetch("http://localhost:8080/api/v1/movie/" + moviesToBuy[i], { headers })
            .then(res => res.json())
            .then(data => {
                moviesToStripe.push({
                    price: data.stripeId,
                    quantity: 1,
                });
            })
            .catch(error => {
                console.log("Error>>>" + error);
            });

        fetchPromises.push(promise);
    }

    Promise.all(fetchPromises)
        .then(() => {
            stripe.redirectToCheckout({
                lineItems: moviesToStripe,
                mode: "payment",
                successUrl: "http://localhost:5500/index.html",
                cancelUrl: "http://localhost:5500/index.html",
            })
                .then(result => {
                    console.log(result);
                });
        });
});


