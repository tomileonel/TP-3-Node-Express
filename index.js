import express from 'express';
import cors from 'cors';
import { sumar, restar, multiplicar, dividir } from './src/modules/matematica.js';
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from './src/modules/OMDBWrapper.js';
import { Alumno, alumnosArray } from './src/models/alumno.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoints
app.get('/', (req, res) => {
  res.send('¡Ya estoy respondiendo!');
});

// Saludar endpoint
app.get('/saludar/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.send(`Hola ${nombre}`);
});

// Validar fecha endpoint
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
  const { ano, mes, dia } = req.params;
  const date = new Date(`${ano}-${mes}-${dia}`);

  if (isNaN(date.getTime())) {
    res.status(400).send('Fecha inválida');
  } else {
    res.status(200).send('Fecha válida');
  }
});

// Matemática endpoints
app.get('/matematica/sumar', (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = sumar(parseInt(n1), parseInt(n2));
  res.status(200).json({ resultado });
});

app.get('/matematica/restar', (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = restar(parseInt(n1), parseInt(n2));
  res.status(200).json({ resultado });
});

app.get('/matematica/multiplicar', (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = multiplicar(parseInt(n1), parseInt(n2));
  res.status(200).json({ resultado });
});

app.get('/matematica/dividir', (req, res) => {
  const { n1, n2 } = req.query;
  if (parseInt(n2) === 0) {
    res.status(400).send('El divisor no puede ser cero');
  } else {
    const resultado = dividir(parseInt(n1), parseInt(n2));
    res.status(200).json({ resultado });
  }
});

// OMDB endpoints
app.get('/omdb/searchbypage', async (req, res) => {
  const { search, p } = req.query;
  const resultado = await OMDBSearchByPage(search, p);
  res.status(200).json(resultado);
});

app.get('/omdb/searchcomplete', async (req, res) => {
  const { search } = req.query;
  const resultado = await OMDBSearchComplete(search);
  res.status(200).json(resultado);
});

app.get('/omdb/getbyomdbid', async (req, res) => {
  const imdbID  = req.query.imdbID;;
  const resultado = await OMDBGetByImdbID(imdbID);
  res.status(200).json(resultado);
});

// Alumnos endpointss
app.get('/alumnos', (req, res) => {
  res.status(200).json(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
    const dniParam = req.params.dni; 
    const alumno = alumnosArray.find(alumno => alumno.DNI === dniParam);

    if (alumno) {
        res.status(200).json(alumno); 
    } else {
        res.status(404).send('Alumno no encontrado'); 
    }
});

app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;
    
    const existeDNI = alumnosArray.some(alumno => alumno.DNI === dni);
    if (existeDNI) {
      return res.status(400).send('El DNI ya está registrado');
    }
  
    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);
  
    res.status(201).send('Alumno creado correctamente');
  });
  app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
    const index = alumnosArray.findIndex(alumno => alumno.DNI === dni);
    if (index !== -1) {
      alumnosArray.splice(index, 1);
      res.status(200).send('OK');
    } else {
      res.status(404).send('Not Found');
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});