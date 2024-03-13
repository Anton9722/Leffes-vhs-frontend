
export function search(input,apiKey) {
    

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value!= '') {
            
            fetch("http://localhost:8080/api/v1/movie/search/"+ input.value, {
                method: "GET",
                headers: apiKey,
                "Content-Type": "application/json"
            })
            .then(response => response.json().catch(err =>{
                let fp =document.getElementById("foundProducts")
                fp.innerHTML = "";
                let errMessage = document.createElement("li")
                errMessage.innerText = "Inget resultat";
                fp.appendChild(errMessage);
    

            }))
            .then(data => {
                if (!data.length == 0) {
                    presentResult(data);
                }
                    

            })
            input.value = '';
        }
    });
    
/*     
     */
}

function presentResult(produkts){
    let result = document.getElementById("foundProducts")
    result.innerHTML = '';
    for (let i in produkts) {
        console.log(produkts[i]);
        let li = document.createElement("li");
        let title = document.createElement("h3");
       // let description = document.createElement("p");
        let categorys = document.createElement("p");
        let price = document.createElement("p");
        let img = document.createElement("img");

        title.innerText = produkts[i].name;
       // description.innerText = produkts[i].description;
        categorys.innerText = produkts[i].category;
        price.innerText = produkts[i].price+" kr";
        img.src = produkts[i].imageUrl;

        li.setAttribute("class", "product");
        title.setAttribute("class", "product-title");
       // description.setAttribute("class", "product-description");
        categorys.setAttribute("class", "product-category");
        price.setAttribute("class", "product-price");
        img.setAttribute("class", "product-image");




        li.append(title,img, categorys, price);
        result.appendChild(li);
        
    }
    
}

