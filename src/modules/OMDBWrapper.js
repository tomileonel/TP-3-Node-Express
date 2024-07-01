
import axios from "axios";

const APIKEY = "8f8ecd65"; 


const OMDBSearchByPage = async (searchText, page = 1) => {
    try {
        const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
        const response = await axios.get(requestString);
        return {
            datos: response.data.Search,
            respuesta: true,
            cantidadTotal: response.data.totalResults
            
        };
    } catch (error) {
        console.error("Error al realizar la búsqueda por página:", error.message);
        return {
            datos: [],
            respuesta: false,
            cantidadTotal: 0,
        };
    }
};

const OMDBSearchComplete = async (searchText) => {
    try {
        const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
        const response = await axios.get(requestString);
        return {
            datos: response.data.Search,
            respuesta: true,
            cantidadTotal: response.data.totalResults,
        };
    } catch (error) {
        console.error("Error al realizar la búsqueda completa:", error.message);
        return {
            datos: [],
            respuesta: false,
            cantidadTotal: 0,
        };
    }
};

const OMDBGetByImdbID = async (imdbID) => {
    try {
        const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
        const response = await axios.get(requestString);
        return {
            datos: [response.data],
            respuesta: true,
            cantidadTotal: 1,
        };
    } catch (error) {
        console.error("Error al obtener la película por IMDb ID:", error.message);
        return {
            datos: [],
            respuesta: false,
            cantidadTotal: 0,
        };
    }
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
