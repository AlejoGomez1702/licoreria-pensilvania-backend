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

CategorySchema.methods.toJSON = function() {
    const { __v, _id, user, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Category', CategorySchema );
