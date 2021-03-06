const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },

    full_name: {
        type: String
    },

    code: {
        type: String,
        trim: true
    },

    img: {
        type: String,
        // required: [true, 'La imagen del producto es obligatoria'],
    },

    description: {
        type: String,
        trim: true
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

    second_sale_price: {
        type: Number,
        default: 0,        
    },

    purchase_price: {
        type: Number,
        default: 0,        
    },

    barcode: {
        type: String,   
        trim: true
    },

    stock: {
        type: Number,
        default: 0,        
    },

    current_existence: {
        type: Number,
        default: 0,        
    },
    vol_alcohol: {
        type: Number
    },
    // Unidades de media
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit'
    },
    // Usuario que creó el producto
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Negocio al que pertenece el producto.
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    // Categoria a la que pertenece el producto
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // SuperCategoria a la que pertenece el producto
    supercategory: {
        type: Schema.Types.ObjectId,
        ref: 'SuperCategory',
        required: [true, 'La supercategoria es obligatoria']
    },
    // Proveedores que tiene el producto
    providers: [{
        type: Schema.Types.ObjectId,
        ref: 'Provider'
    }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

ProductSchema.methods.toJSON = function() {
    const { __v, state, _id, img, ...data  } = this.toObject();
    data.id = _id;
    // Convirtiendo http -> https
    if( img )
    {
        const secureImage = img.replace('http', 'https');
        data.img = secureImage;
    }

    return data;
}

ProductSchema.index({
    name: "text",
    description: "text",
    "unit.unit":"text",
    "category.name":"text"
});

module.exports = model( 'Product', ProductSchema );
