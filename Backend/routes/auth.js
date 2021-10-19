const { Router } = require("express");
const { validarGoogleAuth } = require("../middlewares/validar-google-auth");
const { validarUsuarioGoogle } = require("../controllers/auth");
const router = Router();

router.post("/google/login", validarGoogleAuth, validarUsuarioGoogle);

module.exports = router;
