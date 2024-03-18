
export function search(input, apiKey) {

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value != '') {
            let results = []

            
            
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
                
                    sessionStorage.setItem("results", JSON.stringify(data));
                    if (window.location.href !== "http://localhost:5500/searchResult.html") {
                        window.location.href = "http://localhost:5500/searchResult.html";
                    }


                
                let results = JSON.parse(sessionStorage.getItem("results"));
                presentResult(results);
            })
            input.value = '';
        }
    });

    if (window.location.href == "http://localhost:5500/searchResult.html") {
        try {
            let results = JSON.parse(sessionStorage.getItem("results"));
            presentResult(results);
        } catch (err) {
            let foundProducts = document.getElementById("foundProducts")
            foundProducts.innerHTML = "";
            let errMessage = document.createElement("li")
            errMessage.innerText = "Inget resultat";
            foundProducts.appendChild(errMessage);
        }
    }
}

function categorySearch(input, apiKey) {
    fetch("http://localhost:8080/api/v1/movie/category/" + input, {
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
            let fullResult = []
            try {
            fullResult = JSON.parse(sessionStorage.getItem("results"));
            }catch{
                console.log("här gick något snett (kategori)")
            }
            for (let i = 0; i < data.length; i++) {
                let found = fullResult.find(item => item.id === data[i].id);
                if (found) {
                    fullResult.push(data[i])
                }
            }
            sessionStorage.setItem("results", JSON.stringify(fullResult));
            console.log(fullResult)
                sessionStorage.setItem("results", JSON.stringify(data));
                if (window.location.href !== "http://localhost:5500/searchResult.html") {
                    window.location.href = "http://localhost:5500/searchResult.html";
                }

            
/*             let results = JSON.parse(sessionStorage.getItem("results"));
            presentResult(results); */
        })
    
}


export function presentResult(products){


    let result = document.getElementById("foundProducts")
    result.innerHTML = '';
    for (let i in products) {
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


