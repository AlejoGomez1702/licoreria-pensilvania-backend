const { Schema, model } = require('mongoose');

const UnitSchema = Schema({
    unit: {
        type: String,
        trim: true,
        required: [true, 'La unidad de medida es obligatoria']
    },
    ml: {
        type: Number,
        required: [true, 'La Cantidad de mililitros(ml) es obligatoria'],
        min: 0,
        max: 10000
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

UnitSchema.methods.toJSON = function() {
    const { __v, _id, state, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Unit', UnitSchema );
