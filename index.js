const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express(); //CON EL app SE PUEDE HACER TODAS LAS CONFIGURACIONES.

//CAPTURAR BODY

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//CONEXIÓN A BASE DE DATOS
const uri = `mongodb://localhost/${process.env.DBNAME}`;
const option = { useUnifiedTopology: true }
mongoose.connect(uri, option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e));

//IMPORTAR RUTAS
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const validarToken = require('./middleware/validate-token');


// RUTAS MIDDLEWARES
app.use('/api/user', authRoutes);
app.use('/api/user', validarToken, userRoutes);

//INICIAR SERVER
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`);
});