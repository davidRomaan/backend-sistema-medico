const mongoose = require('mongoose');

const dbConnection = async () => {

    //user: david_roman
    //contraseña: admin123
    try {
        await mongoose.connect(process.env.URL_CONNECT,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

        console.log('Conexion establecida correctamente');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de establecer la conexion')
    }
}

module.exports = {
    dbConnection
}