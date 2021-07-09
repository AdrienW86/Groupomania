// Import

const express = require('express');
const userRoutes = require('./router');
const helmet = require('helmet');

// Instances

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(helmet());           // Protection contre les injections SQL et XMS


module.exports = app;

// Configuration des routes

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Serveur en marche </h1>');
});

app.use('/api/auth', userRoutes)



