export function returnToIndex() {
    let headerTitle = document.getElementById("headerTitle")
    headerTitle.addEventListener("click", () => {
        console.log("Jag är klickad på");
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