const { Schema, model } = require('mongoose');

const AlcoholSchema = Schema({
    alcohol: {
        type: Number,
        required: [true, 'El volumen alcoholico es obligatorio']
    }
});

module.exports = model( 'Alcohol', AlcoholSchema );