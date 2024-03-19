export function returnToIndex() {
    let headerTitle = document.getElementById("headerTitle")
    headerTitle.addEventListener("click", () => {
        window.location.href = "http://localhost:5500/index.html";

    })
}

export function showCart() {
    let cartBtn = document.getElementById("cartBtn");
    cartBtn.addEventListener("click", () => {
        window.location.href = "http://localhost:5500/cart.html"
    })
}

export function findStore() {
    let cartBtn = document.getElementById("findStoreBtn");
    cartBtn.addEventListener("click", () => {
        window.location.href = "https://m.media-amazon.com/images/I/71jC4dTp2QS.jpg"
    })
}

export function showVhsPlayers() {
    let vhsPlayerBtn = document.getElementById("vhsPlayerBtn")
    vhsPlayerBtn.addEventListener("click", () => {
        console.log("Klickidick");

        fetch("http://localhost:8080/api/v1/player/notdeleted", {
            headers: {
                "api_key": "Leffes_api_nyckel",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {

                sessionStorage.setItem("VhsPlayersToShow", JSON.stringify(data));

                let vhsPlayersToShow = JSON.parse(sessionStorage.getItem("VhsPlayersToShow"));
                console.log(vhsPlayersToShow);
                presentVhsPlayers(vhsPlayersToShow);
            })
    })
}

export function presentVhsPlayers(vhsPlayersToShow) {

    let result = document.getElementById("foundProducts")
    result.innerHTML = '';
    for (let i in vhsPlayersToShow) {
        console.log(vhsPlayersToShow[i]);
        let li = document.createElement("li");
        let title = document.createElement("h3");
        let description = document.createElement("p");
        let price = document.createElement("p");
        let img = document.createElement("img");

        title.innerText = vhsPlayersToShow[i].name;
        description.innerText = vhsPlayersToShow[i].description;
        price.innerText = vhsPlayersToShow[i].price + " kr";
        img.src = vhsPlayersToShow[i].imageUrl;

        li.setAttribute("class", "product");
        li.setAttribute("id", vhsPlayersToShow[i].id);
        title.setAttribute("class", "product-title");
        description.setAttribute("class", "product-information");
        price.setAttribute("class", "product-price");
        img.setAttribute("class", "product-image");

        li.addEventListener("click", () => {
            sessionStorage.setItem("sessionStorageId", vhsPlayersToShow[i].id)
            window.location.href = "http://localhost:5500/uniquePlayerPage.html"
        })

        li.append(img, title, description, price);
        result.appendChild(li);
    }
}