const { Schema, model } = require('mongoose');

const UnitSchema = Schema({
    unit: {
        type: String,
        required: [true, 'La unidad de medida es obligatoria']
    },
    ml: {
        type: Number,
        required: [true, 'La Cantidad de mililitros(ml) es obligatoria']
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
});

UnitSchema.methods.toJSON = function() {
    const { __v, _id, state, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Unit', UnitSchema );
