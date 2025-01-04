import axios, { AxiosRequestConfig } from "axios";
import { Pokemon } from "../models/pokemon.model";
import { pokemonResult } from "../models/pokemonResult";
import { pokemonRoot } from "../models/pokemonRoot.model";

interface CustomRequestConfig extends AxiosRequestConfig {
    method?: 'get' | 'post' | 'put' |'delete';
}



const useFetch = () => {
    
    const getData = async (config: CustomRequestConfig) => {
        try {
          const response = await axios(config);
          const data:Pokemon[] | Pokemon | pokemonResult | pokemonRoot= response.data;
          return data;
        } catch(error) {
          console.error('error al realiar la petición');
        }    
    }
    return ({getData});
}
 
export default useFetch;