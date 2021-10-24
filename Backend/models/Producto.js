const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    id: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    valorUnit: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
}, )

module.exports = model('Producto', ProductoSchema)