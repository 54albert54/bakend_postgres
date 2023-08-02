const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const path = require('path');
const bodyParser = require("body-parser");

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3030;


app.use(bodyParser.json()); //app.use(express.json());
app.use(express.static(path.join(__dirname, 'pagina')));

// const whitelist = ['http://localhost:8080', 'https://myapp.co'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   }
// }
app.use(cors());
app.use(express.static(path.join(__dirname, 'pagina')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/pagina/index.html");
});

app.get('/api/v1/tienda', (req, res) => {

  res.sendFile(__dirname+"/pagina/tienda.html");
});

app.get('/api', (req, res) => {
  res.send(`hola esta es la pagina de inicio <br>
  <a href="/v1/products/"> productos</a> <br>
  <a href="/v1/customers"> customers</a> <br> `);
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.get('/lol', (req, res) => {
  const data2 = { mensaje: 'Hola mundo' };
  res.setHeader('Content-Type', 'application/json');

  res.json(data2);
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
