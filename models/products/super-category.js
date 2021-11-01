const { Schema, model } = require('mongoose');

const SuperCategorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    img: {
        type: String,
        default: ''
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'SuperCategory', SuperCategorySchema, 'supercategories' );
