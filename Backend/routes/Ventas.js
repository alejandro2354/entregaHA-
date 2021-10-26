const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

const {
    getVentas,
    crearVenta,
    actualizarVenta,
    buscarVenta,
    getEstados
} = require("../controllers/ventas");
const { validarJwt } = require("../middlewares/validar-jwt");

router.get("/listarVentas", validarJwt, getVentas);

router.get("/estados", validarJwt, getEstados);

router.post("/buscarVenta", validarJwt, buscarVenta);

router.post(
    "/crearVenta",
    [
        check("producto", "el nombre del producto es obligatorio")
            .not()
            .isEmpty(),
        check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
        check("cedulaCliente", "la cedula del cliente es obligatoria")
            .not()
            .isEmpty(),
        check("nombreCliente", "el nombre del cliente es obligatorio")
            .not()
            .isEmpty(),
        check("idVendedor", "el id del vendedor es obligatorio")
            .not()
            .isEmpty(),
        check("valorTotal", "el valor total es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    validarJwt,
    crearVenta
);

router.post(
    "/actualizarVenta",
    [
        check("id", "el codigo de venta es obligatorio").not().isEmpty(),
        check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
        check("cedulaCliente", "la cedula del cliente es obligatoria")
            .not()
            .isEmpty(),
        check("nombreCliente", "el nombre del cliente es obligatorio")
            .not()
            .isEmpty(),
        check("fechaDeVenta", "la fecha de venta es obligatoria")
            .not()
            .isEmpty(),
        check("valorTotal", "el valor total es obligatorio").not().isEmpty(),
        check("estado", "el estado de la venta es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    validarJwt,
    actualizarVenta
);

module.exports = router;
