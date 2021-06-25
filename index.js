const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//Base de datos
dbConnection();



app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto: ' + process.env.PORT);
})

//imYINAKLLrnFoCha
//david_roman