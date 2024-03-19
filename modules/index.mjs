import { presentResult } from "./search.mjs";

export function popularMovies(apiKey) {
  fetch("http://localhost:8080/api/v1/movie", {
    method: "GET",
    headers: apiKey,
    "Content-Type": "application/json",
  })
    .then((response) =>
      response.json().catch((err) => {
        let fp = document.getElementById("foundProducts");
        fp.innerHTML = "";
        let errMessage = document.createElement("li");
        errMessage.innerText = "Inget resultat";
        fp.appendChild(errMessage);
      })
    )
    .then((data) => {
      let randomData = shuffleArray(data);
      let firstFive = randomData.slice(0, 6);

      
      if (window.location.href == "http://localhost:5500/index.html") {
        presentResult(firstFive);
      }
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
