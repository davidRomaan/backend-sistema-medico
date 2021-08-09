const {response} = require('express')
const Medic = require('../models/medic');

async function getMedics(req, res=response) {
    
    const medics = await Medic.find({deleted: false}).populate('user', 'name img').populate('hospital', 'name');

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
            ...req.body,
            deleted: false
        })

        const newMedic = await medic.save();

        return res.status(200).json({
            ok: true,
            newMedic
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
    
    const usId = req.id;
    const idMedic = req.params.id;
    const name = req.body.name;
    const idHospital = req.body.hospital

    try {
        const medic = await Medic.findById(idMedic);

        if (!medic) {
            return res.status(404).json({
                ok: false,
                msg:'No existe el medico'
            });
        }
    
        const params = {
            name: name,
            user: usId,
            hospital: idHospital
        }
    
        const medicUpdated = await Medic.findByIdAndUpdate(idMedic, params, { new: true });
    
        res.status(200).json({
            ok: true,
            msg: 'Medico actualizado con exito',
            medicUpdated
        })   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al editar',
        })
    }
}

async function deleteMedic(req, res=response) {
    
    const id = req.params.id

    try {
        const medic = await Medic.findById(id);
        
        if (!medic) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe'
            })    
        }

        medic.deleted = true;
        medic.save();

        return res.status(200).json({
            ok: true,
            msg: 'El medico se ha eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un erorr al eliminar'
        })
    }   
}
async function getMedicById(req, res = response) {
    
    const id = req.params.id
    try {
    const medic = await Medic.findById(id).populate('user', 'name img').
        populate('hospital', 'name img').where({ deleted: false });
        console.log(medic);
    
        if (!medic) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe'
            })    
        }

        return res.status(200).json({
            ok: true,
            medic: medic
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un erorr'
        })
    }
   
}

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic,
    getMedicById
}