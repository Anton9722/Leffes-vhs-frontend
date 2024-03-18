
export function search(input, apiKey) {


    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value != '') {

            fetch("http://localhost:8080/api/v1/movie/search/" + input.value, {
                method: "GET",
                headers: apiKey,
                "Content-Type": "application/json"
            })
                .then(response => response.json().catch(err => {
                    let foundProducts = document.getElementById("foundProducts")
                    foundProducts.innerHTML = "";
                    let errMessage = document.createElement("li")
                    errMessage.innerText = "Inget resultat";
                    foundProducts.appendChild(errMessage);


                }))
                .then(data => {
                    if (!data.length == 0) {
                        sessionStorage.setItem("results", JSON.stringify(data));
                        if (window.location.href !== "http://localhost:5500/searchResult.html") {
                            window.location.href = "http://localhost:5500/searchResult.html";
                        }

                    }
                    let results = JSON.parse(sessionStorage.getItem("results"));
                    console.log(results);
                    presentResult(results);
                })
            input.value = '';
        }
    });

    if (window.location.href == "http://localhost:5500/searchResult.html") {
        let results = JSON.parse(sessionStorage.getItem("results"));
        presentResult(results);
    }


}

 Show-popular-products
export function presentResult(produkts){
    

  

    let result = document.getElementById("foundProducts")
    result.innerHTML = '';
    for (let i in products) {
        console.log(products[i]);
        let li = document.createElement("li");
        let title = document.createElement("h3");
        let categorys = document.createElement("p");
        let price = document.createElement("p");
        let img = document.createElement("img");

        title.innerText = products[i].name;
        categorys.innerText = products[i].category;
        price.innerText = products[i].price + " kr";
        img.src = products[i].imageUrl;

        li.setAttribute("class", "product");
        li.setAttribute("id", products[i].id);
        title.setAttribute("class", "product-title");
        categorys.setAttribute("class", "product-category");
        price.setAttribute("class", "product-price");
        img.setAttribute("class", "product-image");

        li.addEventListener("click", () => {
            sessionStorage.setItem("sessionStorageId", products[i].id)
            window.location.href = "http://localhost:5500/uniqueProduct.html"

        })


        li.append(img, title, categorys, price);
        result.appendChild(li);

    }

}


