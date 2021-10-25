import axios from "axios";
import React, { useState, Fragment, useEffect } from "react";
import useAuth from "../auth/useAuth";
import "./Productos.css";
import notie from "notie";

function Productos() {
    const auth = useAuth();
    const [nameOrId, setNameOrId] = useState("");
    const [productos, setProductos] = useState([]);
    const [inID, setInID] = useState("");
    const [inDescription, setInDescription] = useState("");
    const [inUnitValue, setInUnitValue] = useState("");
    const [estadoValue, setEstadoValue] = useState(true);

    const listarProductos = async () => {
        let getProductos;
        try {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:4000/api/productos/listarProductos",
                headers: {
                    "x-token": `${auth.token}`,
                },
            });
            getProductos = data.productos;
            setProductos([...getProductos]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarProductos();
    }, []);

    const cargarProducto = async (e) => {
        let getProducto;
        e.preventDefault();
        try {
            const { status, data } = await axios({
                method: "POST",
                url: "http://localhost:4000/api/productos/buscarProducto",
                headers: {
                    "x-token": `${auth.token}`,
                },
                data: {
                    NombreOID: `${nameOrId}`,
                },
            });
            if (status === 202) {
                getProducto = data.producto;
                setInID(getProducto.id);
                setInDescription(getProducto.descripcion);
                setInUnitValue(getProducto.valorUnit);
                document.getElementById("selectEstado").value =
                    getProducto.estado;
                setEstadoValue(getProducto.estado);
            }
        } catch (error) {
            if (error.response.status === 404) {
                notie.alert({
                    text: error.response.data.msg,
                    type: "warning",
                    time: 8,
                });
            } else {
                notie.alert({
                    text: error.response.data.msg,
                    type: "error",
                    time: 8,
                });
            }
        }
    };

    const disbl = (inDescription, inUnitValue) => {
        if (inDescription !== "") {
            if (inUnitValue !== "") {
                return "able";
            }
        }
        return "";
    };

    const registrarProducto = async (e) => {
        e.preventDefault();
        try {
            const { status, data } = await axios({
                method: "POST",
                url: `http://localhost:4000/api/productos/actualizarProducto`,
                headers: {
                    "x-token": `${auth.token}`,
                },
                data: {
                    id: `${inID}`,
                    descripcion: `${inDescription}`,
                    valorUnit: parseInt(inUnitValue),
                    estado: `${estadoValue}`,
                },
            });
            if (status === 201 || status === 200) {
                notie.alert({ text: data.msg, type: "success" });
                listarProductos();
            }
        } catch (error) {
            if (
                error.response.status === 400 &&
                !error.response.data.middleware
            ) {
                notie.alert({
                    text: error.response.data.msg,
                    type: "warning",
                    time: 8,
                });
            } else if (
                error.response.status === 400 &&
                error.response.data.middleware
            ) {
                const { valorUnit } = error.response.data.errors;
                notie.alert({
                    text: valorUnit.msg,
                    type: "warning",
                    time: 8,
                });
            } else {
                console.log(error);
            }
        }
        setInID("");
        setInDescription("");
        setInUnitValue("");
    };

    const borrarInputs = async (e) => {
        e.preventDefault();
        setNameOrId("");
        setInID("");
        setInDescription("");
        setInUnitValue("");
    };

    const list = productos.map((item) => (
        <tr key={item.id}>
            <td> {item.id} </td>
            <td> {item.descripcion} </td>
            <td> {item.valorUnit} </td>
            <td> {item.estado === true ? "Disponible" : "No Disponible"} </td>
        </tr>
    ));

    const vacio = <tr></tr>;

    return (
        <Fragment>
            <h2 id="section_title"> Gestion de productos </h2>
            <div id="interactBar">
                <form>
                    <div id="buscarID">
                        <input
                            type="text"
                            id="input"
                            className="inputBuscarId"
                            placeholder="Descricion o ID"
                            value={nameOrId}
                            onChange={(e) => setNameOrId(e.target.value)}
                        />
                        <button id="Boton" onClick={cargarProducto}>
                            Buscar
                        </button>
                    </div>
                </form>
                <form>
                    <div id="NuevoProducto">
                        <input
                            type="number"
                            id="input"
                            className="InputId"
                            placeholder="Identficador"
                            disabled={true}
                            value={inID}
                        />
                        <input
                            type="text"
                            id="input"
                            className="entradaTest"
                            placeholder="Descripción"
                            value={inDescription}
                            onChange={(e) => setInDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            id="input"
                            className="entradaTest"
                            placeholder="Valor unitario"
                            value={inUnitValue}
                            onChange={(e) => setInUnitValue(e.target.value)}
                        />
                        <select
                            className="EstadoP"
                            id="selectEstado"
                            defaultValue={estadoValue}
                            onChange={(e) => setEstadoValue(e.target.value)}
                        >
                            <option value={true}> Disponible </option>
                            <option value={false}> No Disponible </option>
                        </select>
                        <button
                            id="Boton"
                            disabled={
                                disbl(inDescription, inUnitValue)
                                    ? ""
                                    : "disabled"
                            }
                            onClick={registrarProducto}
                        >
                            Guardar producto
                        </button>
                        <button id="Boton" onClick={borrarInputs}>
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
            <table id="tableUsers">
                <thead>
                    <tr>
                        <th> Identficador </th>
                        <th> Descripcion </th>
                        <th> Valor unitario </th>
                        <th> Estado </th>
                    </tr>
                </thead>
                <tbody>{productos.length ? list : vacio}</tbody>
            </table>
        </Fragment>
    );
}

export default Productos;
