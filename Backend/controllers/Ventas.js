const { response } = require('express');
const { findByIdAndUpdate, findById, findOne } = require('mongoose');
const Ventas = require('../models/Ventas');

const getVentas = async (req, resp = response) => {
    const Ventas = await Ventas.find()

    resp.status(200).json({
        ok:true,
        msg: 'Lista de Ventas',
        Ventas
    });
}

const BuscarVenta = async (req, resp = response) => {

    const VentId = req.body.id;

    try{
        const Venta = await Ventas.findOne({'id': VentId})

        if(!Venta){
            resp.status(404).json({
                ok:false,
                msg: 'la venta con el id especificado no existe',

            });
        }else{
            resp.status(202).json({
                ok: true,
                msg: 'Lista de Ventas',
                Venta
            });

        }

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'error al Buscar Venta'
        });
    }
}

const crearVenta = async (req, resp = response) => {

    const Venta = new Ventas(req.body);

    console.log(Venta);
    console.log(req.body);

    try{
        const SaleSave = await Venta.save();
        resp.status(201).json({
           ok:true,
           msg: 'Venta creada con exito',
           SaleSave
        });
    }catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear Venta'
        });
    }

}

const ActualizarVenta = async(req,resp = response) => {

    const VentId = req.body.id;

    try{
        const Venta = await Venta.findOne({'id': VentId});

        if(!Venta){
            crearVenta(req,resp)
        }else{
            const VentaGuardada = Ventas.findByIdAndUpdate(Venta.id, req.body, {new:true});

            resp.json({
                ok: true,
                msg: 'Venta actualizada exitosamente',
                usuario: VentaGuardada
            });
        }
    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'error al actualizar Venta'
        });
    }
}

module.exports = {
    getVentas,
    crearVenta,
    ActualizarVenta,
    BuscarVenta,
}





