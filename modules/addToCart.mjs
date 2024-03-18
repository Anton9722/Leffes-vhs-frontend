

export function addToCart(produktid){
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart == null){
        cart = [];
    }
    cart.push(produktid);
    localStorage.setItem("cart", JSON.stringify(cart));

}