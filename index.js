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
    res.status(200).json(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
    const dni = req.params.dni;
    const alumno = alumnosArray.find(alumno => alumno.dni === dni);

    if (alumno) {
        res.status(200).send(alumno.username);
        res.status(200).send(alumno.dni);
        res.status(200).send(alumno.edad);

    } else {
        res.status(404).send("Alumno no encontrado");
    }
});
 
//aa

app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;
    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);
    res.status(201).send("Alumno creado exitosamente.");
});

app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
    const index = alumnosArray.findIndex(alumno => alumno.DNI === dni);
    if (index !== -1) {
        alumnosArray.splice(index, 1);
        res.status(200).send("Alumno eliminado correctamente.");
    } else {
        res.status(404).send("No se encontró ningún alumno con ese DNI.");
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
   });