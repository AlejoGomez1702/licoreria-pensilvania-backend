const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        trim: true,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    // Establecimiento al que pertenece el usuario
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model( 'User', UserSchema );
