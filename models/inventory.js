const { Schema, model } = require('mongoose');

const InventorySchema = Schema({
    description: {
        type: String,
        default: 'Inventario de licores'
    },

    // Negocio al que le pertenece el inventario
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }    
});

InventorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Inventory', InventorySchema );
