const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        trim: true,
        required: [true, 'El rol es obligatorio']
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = model( 'Role', RoleSchema );
