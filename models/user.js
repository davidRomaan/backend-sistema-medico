const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

/**
 * Metodo el cual funciona para en este caso renombrar la key _id a uid
 */
UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model('User', UserSchema); 