const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    // Caracteristicas como por ejemplo los años de añejamiento, ediciones especiales, etc... 
    features: {
        type: [String],
        default: []
    },

    description: {
        type: String,
        default: ''
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    price: {
        type: Number,
        default: 0,        
    },
    // Unidades de media
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    // Porcentaje de volumen alcoholico
    alcohol: {
        type: Schema.Types.ObjectId,
        ref: 'Alcohol',
        required: true
    },
    // Usuario que creó el producto
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Categoria a la que pertenece el producto
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, _id, ...data  } = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model( 'Product', ProductSchema );
