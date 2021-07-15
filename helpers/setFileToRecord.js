const Medic = require('../models/medic');
const Hospital = require('../models/hospital');
const User = require('../models/user');
const fs = require('fs');

function deleteFile(path) {
    if (fs.existsSync(path)) {
        //eliminamos la imagen si existe
        fs.unlinkSync(path);
    }
}

async function updateFile(type, id, fileName) {
    
    switch (type) {
        case 'medics':
            const medic = await Medic.findById(id);
            if (!medic) {
                return false
            }
            const medicImgPath = `./uploads/medics/${medic.img}`;
            deleteFile(medicImgPath);
            medic.img = fileName;
            await medic.save();
            return true;
        
        break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            console.log(hospital);
            if (!hospital) {
                return false
            }
            const hospitalImgPath = `./uploads/hospitals/${hospital.img}`;
            deleteFile(hospitalImgPath);
            hospital.img = fileName;
            await hospital.save();
            return true;
        break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false
            }
            const userImgPath = `./uploads/users/${user.img}`;
            deleteFile(userImgPath);
            user.img = fileName;
            await user.save();
            return true;
        break;
        default:
        
        break;
    }
}


module.exports = {
    updateFile
}