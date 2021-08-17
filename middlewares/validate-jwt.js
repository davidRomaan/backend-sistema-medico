const { response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

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

async function validateAdminRole(req, res = response, next) {
    try {
        const uid = req.params.id;

        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        } 

        if (userDb.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar la acción'
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurio un error'
        })
    }
}

async function validateAdminRoleAndSameProfile(req, res = response, next) {
    try {
        const id = req.params.id;
        const uid = req.id;

        console.log(uid);

        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        } 

        if (userDb.role === 'ADMIN_ROLE' || id === uid ) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar la acción'
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurio un error'
        })
    }
}


module.exports = {
    validateToken,
    validateAdminRole,
    validateAdminRoleAndSameProfile
}