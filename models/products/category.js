const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },

    img: {
        type: String
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    // Categoria padre de esta categoria
    supercategory: {
        type: Schema.Types.ObjectId,
        ref: 'SuperCategory',
        required: [true, 'La supercategoria es obligatoria']
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Category', CategorySchema );
