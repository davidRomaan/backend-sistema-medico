const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { findByIdAndRemove, findById } = require('../models/user');
const { generateToken } = require('../helpers/jwt');


/**
 * Metodo que busca todos los usuarios de la bd, tiene un filtro
 * en el find para obtener datos puntuales
 */
async function getUsers(req, res){
    
    const users = await User.find({}, 'name email password role google');

    res.json({
        ok: true,
        users,
        uid: req.uid
    })
}

/**
 * Metodo que crea un usuario en la base de datos 
 */
async function createUser(req, res = response) {
    try {

        const { email, password } = req.body;

       
        const mailExist = await User.findOne({ email });

        if (mailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const user = new User(req.body);
        
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        const userCreated = await user.save();

        //generar token
        const token = await generateToken(userCreated._id);


        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    
   
}

async function updateUser(req, res = response) {
    
    const uid = req.params.id;

    try {
        

        const user = await User.findById(uid);

        if (!user) {
            return res.json({
                ok: false,
                msg: 'No existe un usuario con este id'
            });
        }

        const {password, google, email, ...fields} = req.body;

        if (user.email !== email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este correo'
                });
            }
        }

        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

async function deleteUser(req, res = response) {
    
    const uid = req.params.id;

    try {
    const user = await User.findById(uid);
    
        if (!user) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    } 
        await user.deleteOne();
    
        res.status(200).json({
        ok: true,
        msg: 'Usuario eliminado'
    })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}