const { Schema, model } = require('mongoose');

// const ProductSchema = Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: [true, 'El nombre es obligatorio']
//     },
//     // Caracteristicas como por ejemplo los años de añejamiento, ediciones especiales, etc... 
//     features: {
//         type: [String],
//         default: []
//     },

//     img: {
//         type: String,
//         // required: [true, 'La imagen del producto es obligatoria'],
//     },

//     description: {
//         type: String,
//         trim: true,
//         default: ''
//     },

//     sale_price: {
//         type: Number,
//         default: 0,        
//     },

//     barcode: {
//         type: String,   
//         trim: true,
//         default: '' 
//     },

//     // Unidades de media
//     unit: {
//         type: String,   
//         trim: true,
//         default: '',
//     },
//     // Porcentaje de volumen alcoholico
//     alcohol: {
//         type: String,   
//         trim: true,
//         default: '', 
//     },
//     // Negocio al que pertenece el producto.
//     establishment: {
//         type: String,   
//         trim: true,
//         default: '', 
//     },
//     // Categoria a la que pertenece el producto
//     category: {
//         type: String,   
//         trim: true,
//         default: '', 
//     },
// }, {} );

const SaleSchema = Schema({
    // observations: {
    //     type: String,
    //     trim: true,
    //     default: 'Sin observaciones'
    // },
    products: {
        type: [{
            product: Schema.Types.ObjectId,
            count: Number,
            purchase_price: Number,
            sale_price: Number
        }],
        ref: 'Spirit',
        required: true
    },
    // Usuario que creó la venta
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Negocio en el que se hizo la venta
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

SaleSchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Sale', SaleSchema );