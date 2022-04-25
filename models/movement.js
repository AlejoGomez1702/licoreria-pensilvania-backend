const { Schema, model } = require('mongoose');

const MovementSchema = Schema({
    type: {
        type: String,
        enum: ['entry','exit'],
        trim: true,
        required: [true, 'El tipo es obligatorio']
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'La descripción es obligatoria']
    },

    amount: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    // Usuario que creó el movimiento
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Establecimiento al que pertenece el movimiento
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

MovementSchema.methods.toJSON = function() {
    const { __v, state, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Movement', MovementSchema );
