const { Schema, model } = require('mongoose')

const VentasSchema = Schema(
    {
        id: {
            type: String,
            required: true
        },
        producto: {
            type: String,
            required: true
        },
        Valor: {
            type: String,
            required: true
        },
        id_cliente: {
            type: String,
            required: true
        },
        Nombre_cliente: {
            type: String,
            required: true
        },
        Estado: {
            type: String,
            required: true
        }
    },
)

module.exports = model('Ventas', VentasSchema)