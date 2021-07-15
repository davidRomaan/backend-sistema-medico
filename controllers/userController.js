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
    
    //para recibir parametros desde la url lo hacemos con query:
    const from = Number(req.query.from) || 0;

    //podemos ejecutar varias promesas o varias consultas al mismo tiempo con Promise.all
    const [users, total] = await Promise.all([
        User.find({}, 'name email password role google img').skip(from).limit(5),
        
        User.countDocuments()
    ])

    res.json({
        ok: true,
        users,
        total
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