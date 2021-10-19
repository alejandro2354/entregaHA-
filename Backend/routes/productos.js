const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getProductos, crearProducto, actualizarProducto, buscarProducto} = require('../controllers/productos');

router.get('/listarProductos', getProductos)

router.post(
    '/buscarProducto', 
    [
        check('id', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    buscarProducto);

router.post(
    '/crearProducto', 
    [
        check('id', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'El codigo de barras del producto es obligatorio').not().isEmpty(),
        check('valorUnit', 'La categoria del producto es obligatoria').not().isEmpty(),
        check('estado', 'El estado del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProducto);

router.post(
    '/actualizarProducto', 
    [
        check('id', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'El codigo de barras del producto es obligatorio').not().isEmpty(),
        check('valorUnit', 'La categoria del producto es obligatoria').not().isEmpty(),
        check('estado', 'El estado del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto);

    module.exports = router;