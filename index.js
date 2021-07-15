const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Middlewares Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals.js'));
app.use('/api/medics', require('./routes/medics.js'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto: ' + process.env.PORT);
})

//imYINAKLLrnFoCha
//david_roman