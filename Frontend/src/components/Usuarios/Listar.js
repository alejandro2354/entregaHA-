import React, { useEffect, useState } from "react";
import useAuth from '../../auth/useAuth';
import { listarUsuarios, actualizarUsuarios, obtenerRoles, obtenerEstados } from '../../services/Usuarios.service';
import notie from 'notie';

const Tabla_Usuarios = () => {

    const auth = useAuth();

    const [usuarios, setUsuarios] = useState([]);

    const [roles, setRoles] = useState([]);
    const [estados, setEstados] = useState([])

    const getRoles = async () => {
        try {
            const { data } = await obtenerRoles(auth.token);
            setRoles(data.roles);
        } catch (error) {

        }
    }

    const getEstados = async () => {
        try {
            const { data } = await obtenerEstados(auth.token);
            setEstados(data.estados);
        } catch (error) {

        }
    }

    const getUsuarios = async () => {
        getRoles();
        getEstados();
        try {
            const { data } = await listarUsuarios(auth.token);
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

    const updateUsuarios = async (id, rol, statuss) => {
        try {
            const { status, data } = await actualizarUsuarios(auth.token, id, rol, statuss);
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

    const rolesUpdate = [];
    const estadosUpdate = [];
    usuarios.map((usuario,index) => rolesUpdate[index] = usuario.rol._id);
    usuarios.map((usuario,index) => estadosUpdate[index] = usuario.status);
    return (
        <table id="search_table">
            <thead>
                <tr>
                    <th> Foto </th>
                    <th> Nombre del usuario </th>
                    <th> Correo </th>
                    <th> Rol </th>
                    <th> Estado </th>
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

                                <select className="lists" defaultValue={usuario.rol._id} onChange={(e) => { const selected = e.target.value; rolesUpdate[index] = selected }}>
                                    {
                                        roles.map((rol) => (
                                            <option value={rol._id} key={rol._id}> {rol.name} </option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td>
                                <select className="lists" defaultValue={usuario.status} onChange={(e) => { const selected = e.target.value; estadosUpdate[index] = selected }} >
                                    {
                                        estados.map((estado) => (
                                            <option value={estado._id} key={estado._id}> {estado.name} </option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td> <button className="button" onClick={(event) =>  updateUsuarios(usuario._id, rolesUpdate[index], estadosUpdate[index])}> Actualizar </button> </td>
                        </tr>
                    )
                    )

                }
            </tbody>
        </table>
    );
}

export default Tabla_Usuarios;