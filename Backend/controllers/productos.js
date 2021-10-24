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


    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(req.body.NombreOID);

    if(onlyNumbers && (req.body.NombreOID !== "")){
        const prodNameoID = parseInt(req.body.NombreOID);

        try {

            const producto = await Producto.findOne({ 'id': prodNameoID })
    
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
    }else{
        const prodNameoID = req.body.NombreOID;

        try {

            const producto = await Producto.findOne({ 'descripcion': prodNameoID })
    
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
}

const crearProducto = async (req, res = response) => {
    const productos = await Producto.find();
    const infoNuevoProd = {
        id: productos.length + 1,
        descripcion: req.body.descripcion,
        valorUnit: req.body.valorUnit,
        estado: req.body.estado
    }
    const producto = new Producto(infoNuevoProd);
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

    try {
        if (req.body.id !== "") {
            const ProdID = parseInt(req.body.id);
            const producto = await Producto.findOne({ 'id': ProdID })

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
        } else {
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
