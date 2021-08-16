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
    // // Unidades de media | debe ser otra colección en la BD. 
    // measurement_units: {
    //     type: String,
    //     required: [true, 'La unidad de medida es obligatoria']
    // },
    // // Porcentaje de volumen alcoholico | debe ser otra colección en la BD. 
    // alcohol_volume: {
    //     type: Number,
    //     required: [true, 'El % de volumen alcoholico es requerido']
    // },
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
