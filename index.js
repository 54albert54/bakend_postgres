const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const path = require('path');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use(express.static(path.join(__dirname, 'pagina')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/pagina/index.html");


});

app.get('/api', (req, res) => {
  res.send(`hola esta es la pagina de inicio <br>
  <a href="http://localhost:3000/api/v1/products/"> productos</a> <br>
  <a href="http://localhost:3000/api/v1/customers"> customers</a> <br> `);
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
