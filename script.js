import { search } from "./modules/search.mjs";

import { popularMovies } from "./modules/index.mjs";

import { returnToIndex, showCart, findStore, showVhsPlayers } from "./modules/header.mjs";

returnToIndex()
showCart()
findStore()
showVhsPlayers()






const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

search(searchInput, apiKey);
popularMovies(apiKey);



