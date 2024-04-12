import alumnosArray from "./src/models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./src/modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from
"./src/modules/omdbwrapper.js"
import express from "express"; 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
 res.status(200).send('¡Ya estoy respondiendo!');
})

app.get('/saludar/:nombre', (req, res) => {
    res.status(200).send(`Hola ${req.params.nombre}`);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const { ano, mes, dia } = req.params;
    const fechaString = `${ano}-${mes}-${dia}`;
    const fechaParseada = Date.parse(fechaString);

    if (!isNaN(fechaParseada)) {
        res.status(200).send('Fecha válida');
    } else {
        res.status(400).send('Fecha inválida');
    }
});

app.get('/matematica/sumar/:n1/:n2', (req, res) => {
    const n1 = req.params.numero1;
    const n2 = req.params.numero2;
    const resultado = sumar(parseFloat(n1), parseFloat(n2));
    res.status(200).send(resultado.toString());
});

app.get('/matematica/restar/:n1/:n2', (req, res) => {
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const resultado = restar(n1, n2);
    res.status(200).send(resultado.toString());
});

app.get('/matematica/multiplicar/:n1/:n2', (req, res) => {
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const resultado = multiplicar(n1, n2);
    res.status(200).send(resultado.toString());
});

app.get('/matematica/dividir/:n1/:n2', (req, res) => {
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    try {
        const resultado = dividir(n1, n2);
        res.status(200).send(resultado.toString());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
    const dni = req.params.dni;

    const alumno1 = alumnosArray.find(alumno => alumno.DNI === dni);
    
    if (alumno1) {
        res.status(200).send(alumno1);

    } else {
        res.status(404).send("Alumno no encontrado");
    }
});

app.post('/alumnos', (req, res) => {
});
//incompleto
app.delete('/alumnos', (req, res) => {
});
//incopleto

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
   });

   

//    POST "/alumnos"
// Body:
// {
// "username" : "Monica Gaduro",
// "dni" : "11222333",
// "edad" : 25
// }
// Inserta un alumno en el Array de Alumnos
// Retorna status 201 (Created).
// Nota: Utilizar el método push de la clase Array.
// DELETE "/alumnos"
// Body:
// {
// "dni" : "11222333"
// }
// Elimina a un alumno del array de Alumnos según el DNI enviado.
// Retorna status 200 (OK) en caso de que lo haya encontrado y eliminado.
// Retorna status 404 (Not Found) en caso de que no exista un alumnos con ese DNI.
// Nota: Utilizar el método findIndex y splice de la clase Array

// Endpoints que reutilizan el módulo omdb-wrapper.js
// GET "/omdb/searchbypage?search={texto}&p={pagina}"
// Retorna status 200 (OK) y el resultado de la operación.
// GET "/omdb/searchcomplete?search={texto}"
// Retorna status 200 (OK) y el resultado de la operación.
// GET "/omdb/getbyomdbid?imdbID={imdb}"
// Retorna status 200 (OK) y el resultado de la operación.
// NOTA: Si un endpoint invoca internamente a alguna operación asincrónica, entonces debemos
// marcarlos como un método asincrónico también. Internamente debemos invocar con await, para
// poder esperar el resultado antes de operar con él.
// app.get('/omdb/searchbypage', async (req, res) => {
// ...
// let resultado = await metodoAsincronico(...);
// ...
// })



// app.get('/omdb/searchbypage', async (req, res) => {
//     const { search, p } = req.query;
//     const result = await omdb.searchByPage(search, p);
//     res.status(200).json(result);
// });

// app.get('/omdb/searchcomplete', async (req, res) => {
//     const { search } = req.query;
//     const result = await omdb.searchComplete(search);
//     res.status(200).json(result);
// });

// app.get('/omdb/getbyomdbid', async (req, res) => {
//     const { imdbID } = req.query;
//     const result = await omdb.getByOMDbID(imdbID);
//     res.status(200).json(result);
// });