const { response } = require('express')
const Producto = require('../models/Producto')
const { findByIdAndUpdate, findById, findOne } = require('mongoose');

const getProductos = async (req, resp = response) => {

    const productos = await Producto.find()

    resp.status(200).json({
        ok: true,
        msg: 'Lista de Productos',
        productos
    });
}

const buscarProducto = async (req, res = response) => {

    const prodId = req.body.id;

    try {

        const producto = await Producto.findOne({ 'id': prodId })

        if (!producto) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un producto con el id indicado',
            });
        }else{
            res.status(202).json({
                ok: true,
                msg: 'Lista de Productos',
                producto
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el producto',
        });
    }
}

const crearProducto = async (req, res = response) => {

    const producto = new Producto(req.body);

    console.log(producto);
    console.log(req.body);

    try {
        const productSave = await producto.save();
        res.status(201).json({
            ok: true,
            msg: 'Producto creado de manera exitosa',
            productSave
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al crear el producto',
        });
    }
}

const actualizarProducto = async (req, res = response) => {


    const prodId = req.body.id;
    try {
        const producto = await Producto.findOne({ 'id': prodId });

        //console.log(producto);
        // console.log(req.body);

        if (!producto) {
            crearProducto(req, res)
        } else {
            const productoGuardado = await Producto.findByIdAndUpdate(producto._id, req.body, { new: true });

            res.json({
                ok: true,
                msg: 'Usuario actualizado de manera exitosa',
                usuario: productoGuardado
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el producto',
        });
    }
}

module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    buscarProducto
}
