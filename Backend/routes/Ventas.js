const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getVentas, crearVenta, ActualizarVenta, BuscarVenta} = require('../controllers/Ventas');

router.get('/ListarVentas', getVentas)

router.post('/BuscarVenta',
[
    check('id','el codigo de venta es obligatorio').not().isEmpty(),
    validarCampos
],    
BuscarVenta);

router.post(
    '/crearVenta',
    [
        check('id','el codigo de venta es obligatorio').not().isEmpty(),
        check('producto','el nombre del producto es obligatorio').not().isEmpty(),
        check('Valor', 'el precio de la venta es obligatorio').not().isEmpty(),
        check('id_cliente', 'la identificacion del cliente es obligatorio').not().isEmpty(),
        check('Nombre_Cliente', 'el nombre del cliente es obligatorio').not().isEmpty(),
        check('Estado','El estado inicial de la venta es obligatorio').not().isEmpty(),
        validarCampos
    ], 
crearVenta);

router.post(
    '/ActualizarVenta',
    [
        check('id','el codigo de venta es obligatorio').not().isEmpty(),
        check('producto','el nombre del producto es obligatorio').not().isEmpty(),
        check('Valor', 'el precio de la venta es obligatorio').not().isEmpty(),
        check('id_cliente', 'la identificacion del cliente es obligatorio').not().isEmpty(),
        check('Nombre_Cliente', 'el nombre del cliente es obligatorio').not().isEmpty(),
        check('Estado','El estado inicial de la venta es obligatorio').not().isEmpty(),
        validarCampos
    ], 
ActualizarVenta);

module.exports = router;