
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
        li.innerHTML = produkts[i].name;
        result.appendChild(li);
        
    }
    
}

