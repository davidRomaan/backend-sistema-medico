const { Schema, model } = require('mongoose');

const MedicSchema = Schema({

    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    deleted: {
        type: Boolean
    }
});

/**
 * Metodo el cual funciona para en este caso excluir la __v 
 */
 MedicSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Medic', MedicSchema); 