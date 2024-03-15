let order = document.getElementById("order");
let selectedProducts = document.getElementById("selectedProducts");
let buyBtn = document.getElementById("buyBtn");
let btnDiv = document.getElementById("btnDiv");
let priceText = document.getElementById("price")


let movieIdsLocalStorage = [1,2,3,4,5];
localStorage.setItem("movieIdsLocalStorage", JSON.stringify(movieIdsLocalStorage));

let storedData = localStorage.getItem("movieIdsLocalStorage");

let movieIds = JSON.parse(storedData)

let totalSumPrice = 0;
let fetchPromises = [];

movieIds.forEach(element => {
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

buyBtn.addEventListener("click", function(){

    let moviesToBuy = [];
    let fetchCounter = 0;

    for(let i = 0; i < movieIds.length; i++) {  
        const headers = new Headers();
        headers.append("api_key", "Leffes_api_nyckel");
        fetch("http://localhost:8080/api/v1/movie/" + movieIds[i], {
            headers: headers
        })
        .then(res => res.json())
        .then(data => {

            moviesToBuy.push({
                price: data.stripeId,
                quantity: 1,
            });

            fetchCounter ++;

            console.log(moviesToBuy);

            if(fetchCounter === movieIds.length) {

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


