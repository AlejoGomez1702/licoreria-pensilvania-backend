const { Schema, model } = require('mongoose');

const SaleSchema = Schema({

    products: {
        type: [{
            product: Schema.Types.ObjectId,
            product_name: String,
            count: Number,
            purchase_price: Number,
            sale_price: Number,
            second_sale_price: Number,
            other_price: Number,
            is_second_price: Boolean,
            count_second_price: Number
        }],
        ref: 'Product',
        required: true
    },

    // Dinero abonado que deja el cliente
    deposit: {
        type: Number
    },

    total: {
        type: Number,
        required: true
    },

    total_inversion: {
        type: Number,
        required: true
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    // Usuario que creó la venta
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Cliente asociado a la venta
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
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