const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El tipo es obligatorio']
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = model( 'Type', TypeSchema );
