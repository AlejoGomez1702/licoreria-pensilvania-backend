const { Schema, model } = require('mongoose');

const SaleSchema = Schema({

    products: {
        type: [{
            product: Schema.Types.ObjectId,
            product_name: String,
            count: Number,
            purchase_price: Number,
            sale_price: Number
        }],
        ref: 'Product',
        required: true
    },
    // Usuario que creó la venta
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    total_inversion: {
        type: Number,
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