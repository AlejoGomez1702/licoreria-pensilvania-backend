const { Schema, model } = require('mongoose');

const UnitSchema = Schema({
    // Nombre  de la unidad de medida.
    unit: {
        type: String,
        trim: true,
        required: [true, 'La unidad de medida es obligatoria']
    },
    // Obligatorio cuando la supercategoria es 'Licores'.
    ml: {
        type: Number,
        // required: [true, 'La Cantidad de mililitros(ml) es obligatoria'],
        min: 0,
        max: 10000
    },
    // Obligatorio cuando la supercategoria es 'Cigarrillos'.
    units: {
        type: Number,
        min: 1,
        max: 1000
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
    },
    // A que Supercategoria pertenece la unidad de medida
    supercategory: {
        type: String,
        required: [true, 'La supercategoria es obligatoria']
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

UnitSchema.methods.toJSON = function() {
    const { __v, _id, state, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Unit', UnitSchema );
