import React, { useEffect, useState } from "react";
import useAuth from '../../auth/useAuth';
import {listarUsuarios, actualizarUsuarios, obtenerRoles} from '../../services/Usuarios.service';
import notie from 'notie';

const Tabla_Usuarios = () => {

    const auth = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);

    const getUsuarios = async () => {
        try {
            const { info } = await obtenerRoles(auth.token);
            const { data } = await listarUsuarios(auth.token);
            console.log(data);
            console.log(info)
            setUsuarios(data.users);
            // setRoles(data2.name);

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

    const updateUsuarios = async (id, rol) =>{
        try {
            const { data } = await actualizarUsuarios(auth.token, id, rol);
            console.log(data);
        } catch ({ response: error }) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <table id="search_table">
            <thead>
                <tr>
                    <th> Nombre del usuario </th>
                    <th> Rol </th>
                    <th> Estado </th>
                    <th> Accion </th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map((usuario, index) => (
                        <tr key={usuario._id}>
                            <td> {usuario.name}</td>
                            <td> {Rol_Usuarios(usuario.rol.name)} </td>
                            <td> {Estado_Usuarios()} </td>
                            <td> <button className="button" onClick={(event) =>{ updateUsuarios(usuario._id, usuario.rol._id)}}> Actualizar </button> </td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    );
}

const Rol_Usuarios = (op) => {
    let value = 'Ninguno';
    if (op == "Administrador") value = "Administrador";
    if (op == "Vendedor") value = "Vendedor";

    return (
        <select className="lists" defaultValue={value}> 
            <option value="Ninguno"> Ninguno </option>
            <option value="Administrador"> Administrador </option>
            <option value="Vendedor"> Vendedor </option>
        </select>
    )
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