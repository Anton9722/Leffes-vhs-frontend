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
      const firstFive = data.slice(0, 6);
      console.log(firstFive);

      if (window.location.href == "http://localhost:5500/index.html") {
        presentResult(firstFive);
      }
    });
}
