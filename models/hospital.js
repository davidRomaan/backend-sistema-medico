const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * Metodo el cual funciona para en este caso renombrar la key _id a uid
 */
 HospitalSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Hospital', HospitalSchema); 