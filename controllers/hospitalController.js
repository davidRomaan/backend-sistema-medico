const {response} = require('express')
const Hospital = require('../models/hospital');


async function getHospitals(req, res=response) {
    
    const hospitals = await Hospital.find().populate('user', 'name');


    res.status(200).json({
        ok: true,
        hospitals
    })
}

async function createHospitals(req, res=response) {
    
    const uid = req.id;

    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
     
        const hospitalSaved = await hospital.save();
        
        res.status(200).json({
            ok: true,
            hospital: hospitalSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Herror inesperado'
        })        
    }
}

async function updateHospitals(req, res=response) {
    

    res.status(200).json({
        ok: true,
        msg: 'putHospitals'
    })
}

async function deleteHospitals(req, res=response) {
    

    res.status(200).json({
        ok: true,
        msg: 'deleteHospitals'
    })
}
module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}