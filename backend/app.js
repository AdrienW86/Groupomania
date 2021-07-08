const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/router');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Body Parser configuration 

app.use(bodyParser.urlencoded({ entended: true }));
app.use(bodyParser.json());

module.exports = app;

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

app.use('/api/auth',userRoutes);
