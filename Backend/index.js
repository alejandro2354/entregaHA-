const express = require('express');
const cors = require("cors")

require('dotenv').config();

const {dbConnection} = require('./database/config');

const app = express();

dbConnection();

app.use(cors())

app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/Ventas', require('./routes/Ventas'));

app.listen(process.env.Port, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.Port}`);
});