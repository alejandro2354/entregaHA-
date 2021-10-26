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
        type: Schema.Types.ObjectId,
        ref: "EstadoU",
        default: "617207f5bc80150ac8f4a29f",
        required: true,
    },
    picture: {
        type: String
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol",
        default: "616b32c568f3da2297d04ab7",
        required: true,
    }

},{
    collection: "usuarios"
});

module.exports = model('Usuario', UsuarioSchema);