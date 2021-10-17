const { response } = require("express");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const { generarJWT } = require("../helpers/jwt");

const validarUsuarioGoogle = async (req, resp = response) => {
    const { name, email } = req;

    try {
        let usuario = await Usuario.findOne({
            email,
        }).populate("rol");
        if (usuario) {
            if (usuario.rol.name === "Indefinido") {
                resp.status(401).json({
                    ok: false,
                    msg: "El usuario aun no ha sido autorizado por el administrador",
                });
            } else {
                const token = await generarJWT(usuario.id, usuario.name);
                resp.json({
                    ok: true,
                    msg: "Ok estas autorizado",
                    uid: usuario.id,
                    name: usuario.name,
                    token,
                });
            }
        } else {
            usuario = new Usuario({ name, email });
            const newUsuario = await usuario.save();
            resp.status(201).json({
                ok: true,
                msg: "Usuario creado con exito",
            });
        }
    } catch (error) {
        console.log(error)
    }
/*     resp.json({
        ok: true,
        msg: "validar usuario logueado en google",
    }); */
};

module.exports = {
    validarUsuarioGoogle,
};
