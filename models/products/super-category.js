const { Schema, model } = require('mongoose');

const SuperCategorySchema = Schema({
    code: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
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
    },
    // Tipo de establecimiento
    establishment_type: {
        type: String,
        trim: true,
        required: true,
        emun: ['SPIRIT_TYPE', 'NATURIST_TYPE']
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

SuperCategorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'SuperCategory', SuperCategorySchema, 'supercategories' );
