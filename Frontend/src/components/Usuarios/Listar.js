import React, { useEffect, useState } from "react";
import useAuth from '../../auth/useAuth';
import { listarUsuarios, actualizarUsuarios, obtenerRoles } from '../../services/Usuarios.service';
import notie from 'notie';

const Tabla_Usuarios = () => {

    const auth = useAuth();

    const [usuarios, setUsuarios] = useState([]);

    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        try {
            const { data } = await obtenerRoles(auth.token);
            console.log(data)
            setRoles(data.roles);
        } catch (error) {

        }
    }

    const getUsuarios = async () => {
        getRoles();
        try {
            const { data } = await listarUsuarios(auth.token);
            console.log(data)
            setUsuarios(data.users);

        } catch ({ response: error }) {
            console.log(error);

            if (error.status === 401) {
                setTimeout(() => {
                    auth.logout();
                }, 3000);
                notie.alert({ text: error.data.msg, type: 'warning', time: 3 });
            } else {
                notie.alert({ text: error.data.msg, type: 'error', time: 3 });
            }
        }

    }

    const updateUsuarios = async (id, rol) => {
        try {
            const { status, data } = await actualizarUsuarios(auth.token, id, rol);
            console.log(data);
            if (status === 200) {
                notie.alert({ text: data.msg, type: "success" })
            }
        } catch ({ response: error }) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const pruebas = []

    return (
        <table id="search_table">
            <thead>
                <tr>
                    <th> Foto </th>
                    <th> Nombre del usuario </th>
                    <th> Correo </th>
                    <th> Rol </th>
                    {/* <th> Estado </th> */}
                    <th> Accion </th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map((usuario, index) => (

                        <tr key={usuario._id}>
                            <td> <img alt="Imagen de usuario" src={usuario.picture}></img></td>
                            <td> {usuario.name}</td>
                            <td> {usuario.email}</td>
                            <td>

                                <select className="lists" defaultValue={usuario.rol._id} id={usuario._id} onChange={(e) => { const selected = e.target.value; pruebas[index] = selected }}>
                                    {
                                        roles.map((rol) => (
                                            <option value={rol._id} key={rol._id}> {rol.name} </option>
                                        ))
                                    }
                                </select>
                            </td>
                            {/* <td> {Estado_Usuarios()} </td> */}
                            <td> <button className="button" onClick={(event) => updateUsuarios(usuario._id, pruebas[index])}> Actualizar </button> </td>
                        </tr>
                    )
                    )

                }
            </tbody>
        </table>
    );
}

const Estado_Usuarios = () => {
    return (
        <select className="lists">
            <option value="Pendiente"> Pendiente </option>
            <option value="Autorizado"> Autorizado </option>
            <option value="No_Autorizado"> No autorizado </option>
        </select>
    )
}

export default Tabla_Usuarios;