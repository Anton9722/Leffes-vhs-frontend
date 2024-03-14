import { search } from "./modules/search.mjs";
import {popularMovies} from "./modules/index.mjs";

const apiKey = new Headers();
apiKey.append("api_key", "Leffes_api_nyckel");

search(searchInput, apiKey);
popularMovies(apiKey);


