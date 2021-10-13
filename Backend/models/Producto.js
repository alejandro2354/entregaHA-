const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    id: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    valorUnit: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
}, )

module.exports = model('Producto', ProductoSchema)