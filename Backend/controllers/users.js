const { response } = require('express');
const { findByIdAndUpdate, findById } = require('../models/Usuario');
const Users = require('../models/Usuario')


const getUsers = async (req, res = response) => {

    const users = await Users.find()

    res.status(200).json({
        ok: true,
        msg: 'Lista de Usuarios',
        users
    });
}

const updateUsers = async (req, res = response) => {

    const userId = req.params.id;
    try {
        const user = await Users.findById(userId);

        console.log(user);
        console.log(req.body);

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide en la base de datos',
            });
        }

        const userUpdated = await Users.findByIdAndUpdate(userId, req.body, { new: true });

        res.json({
            ok: true,
            msg: 'Usuario actualizado de manera exitosa',
            usuario: userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el producto',
        });
    }
}


module.exports = {
    getUsers,
    updateUsers
}