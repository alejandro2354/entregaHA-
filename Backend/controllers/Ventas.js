const { response } = require("express");
const Ventas = require("../models/Venta");
const Producto = require("../models/Producto");
const Estado = require("../models/Estado");
const Usuario = require("../models/Usuario");

const getVentas = async (req, resp = response) => {
    try {
        const ventas = await Ventas.find()
        .populate("producto")
        .populate("idVendedor", "name")
        .populate("estado", "name")
        .sort({ id: 1 });

        resp.status(200).json({
            ok: true,
            msg: "Lista de Ventas",
            ventas,
        });
        
    } catch (error) {
        console.log(error);
    }
};

const buscarVenta = async (req, resp = response) => {
    const VentId = req.body.id;

    try {
        const Venta = await Ventas.findOne({ id: VentId });

        if (!Venta) {
            resp.status(404).json({
                ok: false,
                msg: "la venta con el id especificado no existe",
            });
        } else {
            resp.status(202).json({
                ok: true,
                msg: "Lista de Ventas",
                Venta,
            });
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "error al Buscar Venta",
        });
    }
};

const crearVenta = async (req, resp = response) => {
    try {
        let contador = 1;
        const ventas = await Ventas.find().sort({ id: 1 });
        ventas.forEach((venta) => {
            if (venta.id === contador) {
                contador++;
            }
        });
        const newVenta = {
            id: contador,
            cedulaCliente : req.body.cedulaCliente,
            nombreCliente : req.body.nombreCliente,
            producto : req.body.producto,
            cantidad : req.body.cantidad,
            valorTotal : req.body.valorTotal,
            idVendedor: req.body.idVendedor
        }
        const venta = new Ventas(newVenta);
        const ventaSave = await venta.save();
        resp.status(201).json({
            ok: true,
            msg: "Venta creada con exito",
            ventaSave,
        });

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error al crear Venta",
        });
    }
};

const actualizarVenta = async (req, resp = response) => {
    const VentId = req.body.id;

    console.log(Ventas);
    console.log(req.body);

    try {
        const Venta = await Ventas.findOne({ id: VentId });

        if (!Venta) {
            crearVenta(req, resp);
        } else {
            const VentaGuardada = await Ventas.findByIdAndUpdate(
                Venta._id,
                req.body,
                { new: true }
            );

            resp.json({
                ok: true,
                msg: "Venta actualizada exitosamente",
                usuario: VentaGuardada,
            });
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "error al actualizar Venta",
        });
    }
};

module.exports = {
    getVentas,
    crearVenta,
    actualizarVenta,
    buscarVenta,
};
