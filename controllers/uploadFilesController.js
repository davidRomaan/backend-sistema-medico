const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateFile } = require('../helpers/setFileToRecord');
const path = require('path');
const fs = require('fs');

async function fileUpload(req, res = response) {
    
    const { type, id } = req.params;

    const validTypes = ['hospitals', 'medics', 'users'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //procesar la imagen
    const file = req.files.file;
    const nameCut = file.name.split('.');
    const ext = nameCut[nameCut.length - 1];

    //validar extension
    const validExt = ['jpg', 'png', 'gif', 'jpeg'];
    if (!validExt.includes(ext)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Generar el nombre del archivo
    const fileName = `${uuidv4()}.${ext}`;

    //path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName
        });
    })

    //settear imagen al registro correspondiente
    updateFile(type, id, fileName);
}


function recoverImage(req, res = response) {
    
    const { type, img } = req.params;
    
    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);


    if (!fs.existsSync(pathImg)) {
        return res.sendFile(path.join(__dirname, '../uploads/no-image-found.png'));
    }
    res.sendFile(pathImg);
    
}

module.exports = {
    fileUpload,
    recoverImage
}