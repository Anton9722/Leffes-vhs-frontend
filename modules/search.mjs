
export function search(input,apiKey) {
    

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value!= '') {
            let result = document.getElementById("foundProducts")
            result.innerHTML = '';
            
            fetch("http://localhost:8080/api/v1/movie/search/"+ input.value, {
                method: "GET",
                headers: apiKey,
                "Content-Type": "application/json"
            })
            .then(response => response.json())
            .then(data => {
                console.log( data);
                for (let i in data) {
                   let li = document.createElement("li");
                   li.innerHTML = data[i].name;
                   result.appendChild(li);

                }
            })
            input.value = '';
        }
    });

}

