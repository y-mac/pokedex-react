import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

interface CustomRequestConfig extends AxiosRequestConfig {
    method?: 'get' | 'post' | 'put' |'delete';
}



const useFetch = () => {
    
    const getData = async (config: CustomRequestConfig) => {
        try {
          const response = await axios(config);
          const data = response.data;
          return data;
        } catch(error) {
          console.error('error al realiar la petición');
        }    
    }
    return ({getData});
}
 
export default useFetch;