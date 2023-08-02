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


app.use(cors());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {

  res.sendFile(__dirname+"/pagina/index.html");
});



app.get('/api', (req, res) => {
  res.send(`hola esta es la pagina de inicio <br>
  <a href="/"> productos</a> <br>
  <a href="/"> customers</a> <br> `);
});





routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
