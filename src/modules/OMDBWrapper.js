
import axios from "axios";

const APIKEY = "8f8ecd65"; 


const OMDBSearchByPage = async (searchText, page = 1) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`);
        if(response.data.totalResults >= 0){
        return {
            respuesta: true,
            cantidadTotal: response.data.totalResults,
            datos: response.data.Search
        };
    }else{
        return {
            respuesta: false,
            cantidadTotal: 0,
            datos: {}
        };
    }
    } catch (error) {
        console.error("Error en OMDBSearchByPage:", error);
        return error;
    }
};

const OMDBSearchComplete = async (searchText) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`);
        if(response.data.totalResults >= 0){
            return {
                respuesta: true,
                cantidadTotal: response.data.totalResults,
                datos: response.data.Search
            };
        }else{
            return {
                respuesta: false,
                cantidadTotal: 0,
                datos: {}
            };
        }
        } catch (error) {
            console.error("Error en OMDBSearchByPage:", error);
            return error;
        }
    };

const OMDBGetByImdbID = async (imdbID) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`);
        if(response.data.Response != "False"){
            return {
                respuesta: true,
                cantidadTotal: 1,
                datos: [response.data]
            };
        }else{
            return {
                respuesta: false,
                cantidadTotal: 0,
                datos: [response.data]
            };
        }
        } catch (error) {
            console.error("Error en OMDBSearchByPage:", error);
            return error;
        }
    };

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
