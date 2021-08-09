const { response } = require('express');
const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');

async function searchAll(req, res = response) {
    
    const search = req.params.search
        
    const regex = new RegExp(search, 'i');
    
    const [users, medics, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Medic.find({ name: regex }),
        Hospital.find({ name: regex }),
    ])  

    res.status(200).json({
        ok: true,
        users,
        medics,
        hospitals
    })
}

async function searchByCollection(req, res = response) {
    
    const table = req.params.table
    const search = req.params.search
    const regex = new RegExp(search, 'i');

    let data = [];

    console.log(table);
    switch (table) {
        case 'medicos':
             data = await Medic.find({ name: regex, deleted: false }).populate('user', 'name img').populate('hospital', 'name img');
        break;
        case 'hospitales':
             data = await Hospital.find({ name: regex }).populate('user', 'name');
        break;
        case 'usuarios':
             data = await User.find({ name: regex });
        break;
        default:
          return res.status(400).json({
                msg: 'Las tablas disponibles para la busqueda son medicos,hospitales o usuarios'
            })
    }
    res.status(200).json({
        ok: true,
        results: data
    })
}

module.exports = {
    searchAll,
    searchByCollection
}