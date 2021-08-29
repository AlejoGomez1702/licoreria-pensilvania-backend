const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    // Caracteristicas como por ejemplo los años de añejamiento, ediciones especiales, etc... 
    features: {
        type: [String],
        default: []
    },

    img: {
        type: String,
        required: [true, 'La imagen del producto es obligatoria'],
    },

    description: {
        type: String,
        trim: true,
        default: ''
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    sale_price: {
        type: Number,
        default: 0,        
    },

    purchase_price: {
        type: Number,
        default: 0,        
    },

    barcode: {
        type: String,   
        trim: true,
        default: '' 
    },

    stock: {
        type: Number,
        default: 0,        
    },

    current_existence: {
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
    },
    // Inventario al que pertenece el producto
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    // Proveedores que tiene el producto
    providers: [{
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        default: [],
        required: true
    }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

ProductSchema.methods.toJSON = function() {
    const { __v, state, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Product', ProductSchema );
