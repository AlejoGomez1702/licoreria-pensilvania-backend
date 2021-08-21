const { Schema, model } = require('mongoose');

const SaleSchema = Schema({
    observations: {
        type: String,
        trim: true,
        default: 'Sin observaciones'
    },
    products: [{
        type: {
            product: Schema.Types.ObjectId,
            amount: Number
        },
        ref: 'Product',
        required: true
    }],
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

module.exports = model( 'Inventory', SaleSchema );