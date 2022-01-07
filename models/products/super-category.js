const { Schema, model } = require('mongoose');

const SuperCategorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    icon: {
        type: String,
        required: [true, 'El icono de material es obligatorio'],
    },
    // Componente de Angular
    component: {
        type: String,
        required: [true, 'El componente de Angular es obligatorio'],
    },
    img: {
        type: String
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

SuperCategorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'SuperCategory', SuperCategorySchema, 'supercategories' );
