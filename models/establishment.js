const { Schema, model } = require('mongoose');

const EstablishmentSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    cellphone: {
        type: String,
        required: [true, 'El número telefonico es obligatorio'],
        unique: true
    },

    email: {
        type: String,
        unique: true
    }
});

EstablishmentSchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Establishment', EstablishmentSchema );
