const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

async function login(req, res = response) {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'El email no es valido'
            })
        }

        //verificar contraseña
        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) {
            res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }

        //generar token
        const token = await generateToken(user.id);
        
        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    login
}