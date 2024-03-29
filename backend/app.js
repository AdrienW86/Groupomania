// Import 

const express = require('express');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message')
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

// Instances

app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(helmet());             // Protection contre les injections SQL et XSS

app.use("/images", express.static(path.join(__dirname, 'images')));

// Configuration des routes

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1> Serveur en marche </h1>');
});

app.use('/api/auth', messageRoutes)
app.use('/api/auth', userRoutes)

module.exports = app