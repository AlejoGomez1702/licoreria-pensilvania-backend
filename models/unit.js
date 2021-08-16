const { Schema, model } = require('mongoose');

const UnitSchema = Schema({
    unit: {
        type: String,
        required: [true, 'La unidad de medida es obligatoria']
    }
});

module.exports = model( 'Unit', UnitSchema );
