const express = require('express');
const apiRoutes = require('./router');
// Instances

const server = express();

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// Configuration des routes

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Serveur en marche </h1>');
});

server.use('/api/auth', apiRoutes)

// Lancement du serveur

server.listen(8080, function() {
    console.log('Lancement du serveur')
});