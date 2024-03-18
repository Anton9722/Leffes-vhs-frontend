import { search } from "./modules/search.mjs";
//import{categorySearch}from "./modules/categories.mjs"
import {popularMovies} from "./modules/index.mjs";
import { returnToIndex, showCart, findStore } from "./modules/header.mjs";



returnToIndex()
showCart()
findStore()






const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

search(searchInput, apiKey);
popularMovies(apiKey);



