const { response } = require('express')
const Producto = require('../models/Producto')
const { findByIdAndUpdate, findById, findOne } = require('mongoose');

const getProductos = async (req, resp = response) => {

    const productos = await Producto.find();

    resp.status(200).json({
        ok: true,
        msg: 'Lista de Productos',
        productos
    });
}

const buscarProducto = async (req, res = response) => {

    const prodName = req.body.descripcion;

    try {

        const producto = await Producto.findOne({ 'descripcion': prodName })

        if (!producto) {
            res.status(404).json({
                ok: false,
                msg: 'La descripcion no coincide con ningun producto existente',
            });
        }else{
            res.status(202).json({
                ok: true,
                msg: 'Producto',
                producto
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al buscar producto',
        });
    }
}

const crearProducto = async (req, res = response) => {
    const infoNuevoProd = {descripcion: req.body.descripcion, 
        valorUnit: req.body.valorUnit, 
        estado: req.body.estado }
    const producto = new Producto(infoNuevoProd);

    console.log(producto);

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

    const ProdID = req.body._id;
    console.log(ProdID);
    try {
        if(ProdID !== ""){
            const producto = await Producto.findById(ProdID);

            if (!producto) {
                crearProducto(req, res)
            } else {
                const productoGuardado = await Producto.findByIdAndUpdate(producto._id, req.body, { new: true });
    
                res.json({
                    ok: true,
                    msg: 'Usuario actualizado de manera exitosa',
                    productoGuardado
                });
            }
        }else{
            crearProducto(req, res)
        }

        //console.log(producto);
        // console.log(req.body);

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
