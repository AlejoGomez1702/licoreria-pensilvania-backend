const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    dni: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'La CC o NIT es obligatorio']
    },

    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },

    cellphone: {
        type: String,
        trim: true,
        required: [true, 'El celular es obligatorio'],
        unique: true
    },

    address: {
        type: String,
        trim: true
    },
    
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    // Usuario que creó el cliente
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Establecimiento al que pertenece el cliente
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

ClientSchema.methods.toJSON = function() {
    const { __v, state, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Client', ClientSchema );
