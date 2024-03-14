
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
                    sessionStorage.setItem("results", JSON.stringify(data));
                    if (window.location.href !== "http://localhost:5500/searchResult.html") {
                        window.location.href = "http://localhost:5500/searchResult.html";
                    }
                    
                }
                let results = JSON.parse( sessionStorage.getItem("results"));
                console.log(results);
                 presentResult(results);
            })
            input.value = '';
        }
    });

    if(window.location.href == "http://localhost:5500/searchResult.html"){
        let results = JSON.parse( sessionStorage.getItem("results"));
        presentResult(results);
    }
    
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
        let categorys = document.createElement("p");
        let price = document.createElement("p");
        let img = document.createElement("img");

        title.innerText = produkts[i].name;
        categorys.innerText = produkts[i].category;
        price.innerText = produkts[i].price+" kr";
        img.src = produkts[i].imageUrl;

        li.setAttribute("class", "product");
        li.setAttribute("id", produkts[i].id);
        title.setAttribute("class", "product-title");
        categorys.setAttribute("class", "product-category");
        price.setAttribute("class", "product-price");
        img.setAttribute("class", "product-image");




        li.append(title,img, categorys, price);
        result.appendChild(li);
        
    }
    
}

function redirect(data){
    if(window.location.href == "http://localhost:5500/searchResult.html"){
        presentResult(data);
        console.log("rätt");

    }else{
        window.location.href = "http://localhost:5500/searchResult.html";
        presentResult(data);
        console.log("fel");
    }

}

