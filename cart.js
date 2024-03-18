import { returnToIndex, showCart, findStore } from "./modules/header.mjs";
import { search } from "./modules/search.mjs";


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
search(searchInput, apiKey);


let productsToBuy = localStorage.getItem("itemsInCart")
let moviesToBuy = JSON.parse(productsToBuy)

let totalSumPrice = 0;

moviesToBuy.forEach(element => {
    const headers = new Headers();
    headers.append("api_key", "Leffes_api_nyckel");

    fetch("http://localhost:8080/api/v1/movie/" + element, {
        headers: headers
    })
        .then(res => res.json())
        .then(data => {
            let li = document.createElement("li");
            let img = document.createElement("img");
            let title = document.createElement("h4");

            img.src = data.imageUrl;
            img.style.width = "200px"
            img.style.marginLeft = "20px"
            title.innerHTML = data.name;

            totalSumPrice += data.price;
            priceText.innerHTML = "TOTAL SUMMA: " + parseFloat(totalSumPrice.toFixed(2)) + " KR"

            li.appendChild(img);
            li.appendChild(title);
            order.appendChild(li);

        })
        .catch(error => {
            console.log("Error >>> ", error);
        })
});

let stripe = Stripe("pk_test_51OlqHVKQ2XHNRrsT7XkQ8t3bbWfzbfoOT66XnL6sAWEo1Az2V7y4xQuu9WTEZjbVuiFw7n31x6L3qoyH7I0geWAO00Jy3qJEIM");

buyBtn.addEventListener("click", function () {

    let moviesToBuy = [];
    let fetchCounter = 0;

    for (let i = 0; i < moviesToBuy.length; i++) {
        const headers = new Headers();
        headers.append("api_key", "Leffes_api_nyckel");
        fetch("http://localhost:8080/api/v1/movie/" + moviesToBuy[i], {
            headers: headers
        })
            .then(res => res.json())
            .then(data => {

                moviesToBuy.push({
                    price: data.stripeId,
                    quantity: 1,
                });

                fetchCounter++;

                console.log(moviesToBuy);

                if (fetchCounter === moviesToBuy.length) {

                    stripe.redirectToCheckout({
                        lineItems: moviesToBuy,
                        mode: "payment",
                        successUrl: "https://www.google.com/",
                        cancelUrl: "https://www.google.com/",
                    })
                        .then(result => {
                            console.log(result);
                        })

                }

            })
            .catch(error => {
                console.log(error);
            });
    }
});


