
import axios from "axios";

const APIKEY = "8f8ecd65"; 

const OMDBSearchByPage = async (searchText, page = 1) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`);
        return {
            respuesta: true,
            cantidadTotal: response.data.totalResults,
            datos: response.data.Search
        };
    } catch (error) {
        console.error("Error en OMDBSearchByPage:", error);
        return {
            respuesta: false,
            cantidadTotal: 0,
            datos: {}
        };
    }
};

const OMDBSearchComplete = async (searchText) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`);
        return {
            respuesta: true,
            cantidadTotal: response.data.totalResults,
            datos: response.data.Search
        };
    } catch (error) {
        console.error("Error en OMDBSearchComplete:", error);
        return {
            respuesta: false,
            cantidadTotal: 0,
            datos: {}
        };
    }
};

const OMDBGetByImdbID = async (imdbID) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`);
        return {
            respuesta: true,
            cantidadTotal: 1,
            datos: [response.data]
        };
    } catch (error) {
        console.error("Error en OMDBGetByImdbID:", error);
        return {
            respuesta: false,
            cantidadTotal: 0,
            datos: {}
        };
    }
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
