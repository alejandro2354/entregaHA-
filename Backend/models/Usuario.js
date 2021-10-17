const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        //required: true,
    },

    rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol",
        default: "616b32ec68f3da2297d04ab8",
        required: true,
    }

},{
    collection: "usuarios"
});

module.exports = model('Usuario', UsuarioSchema);