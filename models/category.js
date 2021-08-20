const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    img: {
        type: String,
    },

    state: {
        type: Boolean,
        default: true,
        required: true
    },

    // Establecimiento que creó la categoria
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Category', CategorySchema );
