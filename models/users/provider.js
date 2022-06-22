const { Schema, model } = require('mongoose');

const ProviderSchema = Schema({
    dni: {
        type: String,
        trim: true,
        required: [true, 'El NIT o CC es obligatorio']
    },

    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        trim: true
    },

    cellphone: {
        type: String,
        trim: true,
        required: [true, 'El celular es obligatorio']
    },

    address: {
        type: String,
        trim: true
    },
    
    img: {
        type: String
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },
    // Productos que provee
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: []
    }],
    // Usuario que creó el proveedor
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Establecimiento al que pertenece el proveedor
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

ProviderSchema.methods.toJSON = function() {
    const { __v, state, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Provider', ProviderSchema );
