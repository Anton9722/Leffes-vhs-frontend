let searchValue = "";
export function search(input,apiKey) {
    

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchValue = input.value;
            
            input.value = '';
        }
    });

    fetch("http://localhost:8080/api/v1/movie", {
        method: "GET",
        headers: apiKey,
        "Content-Type": "application/json"
    })
    .then(response => response.json())
    .then(data => {
        console.log( data);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
}

