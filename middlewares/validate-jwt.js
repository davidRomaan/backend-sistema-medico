const { response } = require("express");
const jwt = require('jsonwebtoken');


function validateToken(req, res = response, next) {
    
    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //podemos pasar info desde el middleware hasta el controlador donde se este implementando este middleware
        //por ejemplo estamos pasando por la req el id y en donde estamos implementando este middleware lo
        //obtenemos con el req.uid
        req.id = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validateToken
}