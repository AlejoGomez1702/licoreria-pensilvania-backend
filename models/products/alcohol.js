const { Schema, model } = require('mongoose');

const AlcoholSchema = Schema({
    alcohol: {
        type: Number,
        required: [true, 'El volumen alcoholico es obligatorio'],
        min: 0,
        max: 100
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    // Establecimiento que creó la categoria
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

AlcoholSchema.methods.toJSON = function() {
    const { __v, _id, state, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Alcohol', AlcoholSchema );