/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "./Listar.css";
import {
    obtenerEstados,
    actualizarVentas,
} from "../../services/Ventas.service";
import useAuth from "../../auth/useAuth";
import notie from "notie";
import Autocompletado from "./Autocompletado2";


const Tabla_Ventas = ({ ventas, getVentas, productos }) => {
    const auth = useAuth();
    const [modal, setModal] = useState(false);
    const [estados, setEstados] = useState([]);
    const [cantidadProducto, setCantidadProducto] = useState(0);
    const [cedulaCliente, setCedulaCliente] = useState(0);
    const [nombreCliente, setNombreCliente] = useState("");
    const [fechaVenta, setFechaVenta] = useState("0000/00/00");
    const [estadosVenta, setEstadosVenta] = useState("");


    const [idVenta, setIdVenta] = useState(0);
    const [producto, setProducto] = useState(null);
    const [productoEditar, setProductoEditar] = useState(null);
    const [vendedor, setVendedor] = useState("");
    

    const getEstados = async () => {
        try {
            const { data } = await obtenerEstados(auth.token);
            setEstados(data.estados);
        } catch (error) {
            console.log(error);
        }
    };

    const updateVentas = async (dataS) => {
        try {
            const { status, data } = await actualizarVentas(auth.token, dataS);
            if (status === 200) {
                notie.alert({ text: data.msg, type: "success" });
                setModal(false);
                getVentas();
            }
        } catch ({ response: error }) {
            if (error.status === 400 && error.data.middleware) {
                notie.alert({
                    text: "Rellena todos los campos",
                    type: "error",
                });
            } else {
                console.log(error);
            }
        }
    };

    const listar_ventas = ventas.map((venta) => (
        <tr key={venta.id}>
            <td>{venta.id}</td>
            <td>{venta.producto.id}</td>
            <td>{venta.producto.descripcion}</td>
            <td>{venta.producto.valorUnit}</td>
            <td>{venta.cantidad}</td>
            <td>{venta.cedulaCliente}</td>
            <td>{venta.nombreCliente}</td>
            <td>{venta.idVendedor.name}</td>
            <td>{venta.fechaDeVenta}</td>
            <td>{venta.valorTotal}</td>
            <td>{venta.estado.name}</td>
            <td>
                {" "}
                <input
                    type="button"
                    value="Editar"
                    className="fields"
                    onClick={() => {
                        setModal(true);
                        setIdVenta(venta.id);
                        setCantidadProducto(venta.cantidad);
                        setCedulaCliente(venta.cedulaCliente);
                        setNombreCliente(venta.nombreCliente);
                        setFechaVenta(venta.fechaDeVenta);
                        setEstadosVenta(venta.estado._id);
                        setProductoEditar(venta.producto.id - 1)
                        setVendedor(venta.idVendedor.name);
                    }}
                />
            </td>
        </tr>
    ));

    useEffect(() => {
        getEstados();
    }, []);

    const handleProductoSelected = (productoSelect) => {
        setProducto(productoSelect);
    };

    return (
        <Fragment>
            <table id="search_table">
                <thead>
                    <tr>
                        <th> Id de la venta </th>
                        <th> Id producto </th>
                        <th> Nombre producto </th>
                        <th> Precio producto </th>
                        <th> Cantidad </th>
                        <th> Cedula cliente </th>
                        <th> Nombre cliente </th>
                        <th> Id de vendedor </th>
                        <th> Fecha de venta </th>
                        <th> Valor total </th>
                        <th> Estado </th>
                        <th> Accion </th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length > 0 ? (
                        listar_ventas
                    ) : (
                        <tr>
                            <td colSpan={9}>No hay ventas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <PureModal
                width="50vw"
                header="Actualizar venta"
                footer={
                    <div className="form-group">
                        <button
                            id="button_create"
                            className="button"
                            disabled={ !(producto+1) || !cantidadProducto || !cedulaCliente || !nombreCliente || !fechaVenta || !estadosVenta}
                            onClick={(e) => {
                                try {
                                    let data = {
                                        id: idVenta,
                                        producto: productos[producto]._id,
                                        cantidad: cantidadProducto,
                                        cedulaCliente: cedulaCliente,
                                        nombreCliente: nombreCliente,
                                        fechaDeVenta: fechaVenta,
                                        valorTotal: productos[producto].valorUnit * cantidadProducto,
                                        estado: estadosVenta,
                                    };
                                    updateVentas(data);
                                } catch (error) {
                                    notie.alert({
                                        text: "Falta producto",
                                        type: "error",
                                    });
                                }
                            }}
                        >
                            {" "}
                            Actualizar{" "}
                        </button>
                    </div>
                }
                isOpen={modal}
                // closeButton="close"
                // closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }}
            >
                <form>
                    <div className="form-group">
                        <span> Id del producto </span>
                        <input
                            disabled={true}
                            type="number"
                            name="id_producto"
                            className="fields"
                            value={
                                producto !== null
                                ? productos[producto].id
                                : ""
                            }
                            onChange={(e) => {}}
                        ></input>
                    </div>
                    <Autocompletado
                        nombreAutocompletado={"Nombre del producto"}
                        productos={productos}
                        handleProductoSelected={handleProductoSelected}
                        productoEditar={productoEditar}
                    />
                    <div className="form-group">
                        <span> Precio unitario </span>
                        <input
                            disabled={true}
                            type="number"
                            name="precio_producto"
                            className="fields"
                            value={
                                producto !== null
                                    ? productos[producto].valorUnit
                                    : ""
                            }
                            onChange={(e) => {}}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Cantidad del producto </span>
                        <input
                            type="number"
                            name="cantidad_producto"
                            className="fields"
                            value={cantidadProducto}
                            onChange={(e) => {
                                setCantidadProducto(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Valor de la venta </span>
                        <input
                            disabled={true}
                            type="number"
                            name="valor_venta"
                            className="fields"
                            value={
                                producto !== null
                                ? cantidadProducto * productos[producto].valorUnit
                                : ""       
                            }
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Cedula de cliente </span>
                        <input
                            type="number"
                            name="cedula_producto"
                            className="fields"
                            value={cedulaCliente}
                            onChange={(e) => {
                                setCedulaCliente(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Nombre de cliente </span>
                        <input
                            type="text"
                            name="nombre_producto"
                            className="fields"
                            value={nombreCliente}
                            onChange={(e) => {
                                setNombreCliente(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Id de vendedor </span>
                        <input
                            disabled={true}
                            type="text"
                            name="id_vendedor"
                            className="fields"
                            value={vendedor}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Fecha de venta </span>
                        <input
                            type="date"
                            name="fecha_producto"
                            className="fields"
                            value={fechaVenta}
                            onChange={(e) => setFechaVenta(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-group">
                        <span> Estado </span>
                        <select
                            name="estado_producto"
                            className="fields"
                            value={estadosVenta}
                            onChange={(e) => setEstadosVenta(e.target.value)}
                        >
                            {estados.map((estado) => (
                                <option value={estado._id} key={estado._id}>
                                    {" "}
                                    {estado.name}{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </PureModal>
        </Fragment>
    );
};

export default Tabla_Ventas;
