const {response} = require('express')
const Hospital = require('../models/hospital');


async function getHospitals(req, res=response) {
    
    const hospitals = await Hospital.find({deleted: false}).populate('user', 'name');


    res.status(200).json({
        ok: true,
        hospitals
    })
}

async function createHospitals(req, res=response) {
        
    const uid = req.id;

    const hospital = new Hospital({
        user: uid,
        ...req.body,
        deleted: false
    });

    try {
     
        const hospitalSaved = await hospital.save();
        
        return res.status(200).json({
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
    
    try {
        
        const id = req.params.id;

        const hospital = await Hospital.findById(id);

        if (!hospital) { 
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital'
            });
        }

        const params = {
            ...req.body,
            user: req.id
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, params, { new: true });

        res.status(200).json({
            ok: true,
            hospital: updatedHospital
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el hospital'
        })        
    }


}

async function deleteHospitals(req, res=response) {
    

    try {
        const id = req.params.id;

        const hospital = await Hospital.findById(id);

        if (!hospital) { 
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital'
            });
        }

        hospital.deleted = true
        hospital.save();

        res.status(200).json({
            ok: true,
            msg: 'Hospital deshabilitado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el hospital'
        })        
    }
}
module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}