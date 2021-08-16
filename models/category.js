const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    // Usuario que creó la categoria
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model( 'Category', CategorySchema );
