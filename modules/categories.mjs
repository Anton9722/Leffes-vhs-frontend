
import{presentResult}from "./search.mjs"
const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

let actionBtn = document.getElementById("action-btn");
let thrillerBtn = document.getElementById("thriller-btn")
let scienceFictionBtn = document.getElementById("scienceFiction-btn")
let dramaBtn = document.getElementById("drama-btn")
let familyBtn = document.getElementById("family-btn")
let warBtn = document.getElementById("war-btn")
let comedyBtn = document.getElementById("comedy-btn")
let horrorBtn = document.getElementById("horror-btn")
let adventureBtn = document.getElementById("adventure-btn")


 function categorySearch(category,apiKey){
    fetch("http://localhost:8080/api/v1/movie/category/" + category, {
        method: "GET",
        headers: apiKey,
        "Content-Type": "application/json"
    })
     .then(response => response.json()
     .then(data => {
        console.log(data)
        sessionStorage.setItem("results", JSON.stringify(data));
        window.location.href = "http://localhost:5500/searchResult.html";

     }))

}

actionBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("action",apiKey);
    
})
thrillerBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("Thriller",apiKey);
   
    
})
scienceFictionBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("Science Fiction",apiKey);
 
    
})
dramaBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("drama",apiKey);

    
})
familyBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("familj",apiKey);

})
warBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("krig",apiKey);

    
})
comedyBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("komedi",apiKey);

    
})
horrorBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("skräck",apiKey);

    
})
adventureBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    categorySearch("äventyr",apiKey);
    
})
