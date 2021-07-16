const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');

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

async function googleSignIn(req, res = response) {
    
    
    try {
        const token = req.body.token;
        const { name, email, picture } = await googleVerify(token);
        
        //verificar si ya existe un usuario con el correo del usuario logueado
        const userDB = await User.findOne({ email });

        let newUser;

        if (!userDB) {
            newUser = new User({
                name: name,
                email,
                password: '123',
                img: picture,
                google: true
            });
        } else {
            //existe el usuario
            newUser = userDB;
            newUser.google = true;
            newUser.password = '@@@';
        }

        await newUser.save();

        //generar token
        const generatedToken = await generateToken(newUser.id);

        res.json({
            ok: true,
            generatedToken
        });


    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}