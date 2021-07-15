const {response} = require('express')
const Medic = require('../models/medic');

async function getMedics(req, res=response) {
    
    const medics = await Medic.find().populate('user', 'name img').populate('hospital', 'name');

    res.status(200).json({
        ok: true,
        medics
    })
}

async function createMedic(req, res=response) {
    
    try {
        const uid = req.id;


        const medic = new Medic({
            user: uid,
            ...req.body
        })

        const medico = await medic.save();

        res.status(500).json({
            ok: true,
            medico
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })        
    }
}

async function updateMedic(req, res=response) {
    

    res.status(200).json({
        ok: true,
        msg: 'putMedic'
    })
}

async function deleteMedic(req, res=response) {
    

    res.status(200).json({
        ok: true,
        msg: 'deleteMedic'
    })
}
module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
}