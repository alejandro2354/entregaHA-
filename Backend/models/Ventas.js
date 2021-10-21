const { Schema, model } = require('mongoose')
const Estado = require ('./Estado')

const VentasSchema = Schema(
    {
        id: {
            type: String,
            required: true
        },
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
        },
        Valor: {
            type: String,
            required: true
        },
        id_vendedor: {
            type: Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        id_cliente: {
            type: String,
            required: true
        },
        Estado: {
            type: Schema.Types.ObjectId,
            ref: "Estado",
            required: true
        },
        Nombre_cliente: {
            type: String,
            required: true
        }
    },
)

module.exports = model('Ventas', VentasSchema)