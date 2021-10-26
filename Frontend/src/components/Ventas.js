/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect } from "react";
import useAuth from "../auth/useAuth";
import "./Ventas.css";
import Listar from "./Ventas/Listar";
import {
    listarVentas,
    crearVenta,
    listarProductos,
} from "../services/Ventas.service";
import Autocompletado from "./Ventas/Autocompletado";
import notie from "notie";

function Ventas() {
    const auth = useAuth();
    const [ventas, setVentas] = useState([]);
    const [ventas2, setVentas2] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cedulaCliente, setCedulaCliente] = useState(null);
    const [nombreCliente, setNombreCliente] = useState("");
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [buscarVenta, setBuscarVenta] = useState("");

    const getVentas = async () => {
        try {
            const { data } = await listarVentas(auth.token);
            setVentas([...data.ventas]);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getVentas();
    }, []);

    const getProductos = async () => {
        try {
            const { data } = await listarProductos(auth.token);
            setProductos([...data.productos]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductos();
    }, []);

    const handleProductoSelected = (productoSelect) => {
        setProducto(productoSelect);
    };

    const createVenta = async () => {
        try {
            let fecha = new Date();
            fecha = fecha.toISOString().slice(0, 10);
            const venta = {
                cedulaCliente: cedulaCliente,
                nombreCliente: nombreCliente,
                producto: productos[producto]._id,
                cantidad: cantidad,
                valorTotal: productos[producto].valorUnit * cantidad,
                idVendedor: auth.user.uid,
                fechaDeVenta: fecha,
            };
            const { status, data } = await crearVenta(auth.token, venta);
            if (status === 201) {
                notie.alert({
                    type: "success",
                    text: data.msg,
                    time: 8,
                })
                getVentas();
            }else{
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuscarVenta = () => {
        const regex = /^[0-9]*$/;
        const onlyNumbers = regex.test(buscarVenta);

        if (onlyNumbers && buscarVenta !== null) {
            const arrVentTemp = [];
            const buscarNumeroVenta = parseInt(buscarVenta);
            if(ventas.length + 1 > buscarNumeroVenta){
                ventas.map((venta) => (venta.id === buscarNumeroVenta ? arrVentTemp.push(venta) : null));
                setVentas2([...arrVentTemp]);
            }else{
                ventas.map((venta) => (venta.cedulaCliente === buscarNumeroVenta ? arrVentTemp.push(venta) : null));
                setVentas2([...arrVentTemp]);
            }
        }else if (buscarVenta !== null) {
            const arrVentTemp = [];
            ventas.map((venta) => {
                let nombreCliente = venta.nombreCliente.toLowerCase();
                if(nombreCliente.indexOf(buscarVenta.toLowerCase()) !== -1){
                    return arrVentTemp.push(venta);
                }else{
                    return null;
                }
            });
            setVentas2([...arrVentTemp]);
        }
    }

    useEffect(() => {
        handleBuscarVenta();
    }, [buscarVenta, ventas]);

    const disbl = (nombreCliente, cedulaCliente, producto, cantidad ) => {
        if (nombreCliente !== "") {
            if (cedulaCliente !== null) {
                if (producto !== null) {
                    if (cantidad !== null) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const styles = {
        mensajeNoSeEncontro: {
            marginTop: 10
        }
    }

    return (
        <Fragment>
            <h2 id="section_title"> Gestion de ventas </h2>
            <div id="section_filter">
                <div className="container-form-search">
                    <div className="form-group">
                        <label>
                            Buscar venta <br />
                            <input
                                id="Buscar_venta"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => setBuscarVenta(e.target.value)}
                                value={buscarVenta}
                                placeholder="Buscar venta..."
                                name="Buscar_venta"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                </div>
                <div className="container-form-group" >
                    <div className="form-group">
                        <label>
                            Nombre del cliente <br />
                            <input
                                type="text"
                                autoComplete="off"
                                onChange={(e) => setNombreCliente(e.target.value)}
                                placeholder="Nombre del cliente"
                                name="nombre_producto"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Cedula del cliente <br />
                            <input
                                type="number"
                                autoComplete="off"
                                onChange={(e) => setCedulaCliente(e.target.value)}
                                placeholder="Cedula del cliente"
                                name="cedula_producto"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <Autocompletado
                            nombreAutocompletado={"Producto"}
                            productos={productos}
                            handleProductoSelected={(e) =>
                                handleProductoSelected(e)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Precio del producto <br />
                            <input
                                type="number"
                                disabled={true}
                                value={
                                    producto !== null
                                        ? productos[producto].valorUnit
                                        : ""
                                }
                                placeholder="Precio del producto"
                                name="precio_producto"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Cantidad <br />
                            <input
                                type="number"
                                autoComplete="off"
                                onChange={(e) => setCantidad(e.target.value)}
                                value={cantidad !== null ? cantidad : ""}
                                placeholder="Cantidad"
                                name="cantidad"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Valor total <br />
                            <input
                                type="number"
                                disabled={true}
                                value={
                                    producto !== null
                                        ? productos[producto].valorUnit * cantidad
                                        : ""
                                }
                                placeholder="Valor total"
                                name="id_vendedor"
                                className="fields"
                            ></input>
                        </label>
                    </div>
                    <div className="form-group-button">
                        <button
                            id="button_create"
                            className="button"
                            onClick={createVenta}
                            disabled={disbl(nombreCliente, cedulaCliente, producto, cantidad) ? "" : "disabled"}
                        >
                            {" "}
                            Crear{" "}
                        </button>
                    </div>
                </div>
            </div>
            {ventas2.length > 0 ? <Listar ventas={ventas2} getVentas={() => getVentas()}/> : (buscarVenta === null || buscarVenta === "") ? <Listar ventas={ventas} getVentas={() =>getVentas()}/> : <h2 style={styles.mensajeNoSeEncontro}>No existen ventas registradas con id, nombre o cedula: {buscarVenta} </h2>}
        </Fragment>
    );
}

export default Ventas;
