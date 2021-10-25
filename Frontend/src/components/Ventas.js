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
    const [productos, setProductos] = useState([]);
    const [cedulaCliente, setCedulaCliente] = useState(null);
    const [nombreCliente, setNombreCliente] = useState("");
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(null);

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
        const venta = {
            cedulaCliente: cedulaCliente,
            nombreCliente: nombreCliente,
            producto: productos[producto]._id,
            cantidad: cantidad,
            valorTotal: productos[producto].valorUnit * cantidad,
            idVendedor: auth.user.uid,
        };
        try {
            const { status, data } = await crearVenta(auth.token, venta);
            if (status === 201) {
                notie.alert({
                    type: "success",
                    text: data.msg,
                    time: 8,
                });
                getVentas();
            }else{
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <h2 id="section_title"> Gestion de ventas </h2>
            <div id="section_filter">
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
                <div className="form-group">
                    <button
                        id="button_create"
                        className="button"
                        onClick={createVenta}
                    >
                        {" "}
                        Crear{" "}
                    </button>
                </div>
            </div>
            <Listar ventas={ventas} />
        </Fragment>
    );
}

export default Ventas;
