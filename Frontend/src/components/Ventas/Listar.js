/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './Listar.css'
import { obtenerEstados, actualizarVentas } from "../../services/Ventas.service";
import useAuth from "../../auth/useAuth";
import notie from "notie";

const modalData = [];

const Tabla_Ventas = ({ ventas, getVentas } ) => {
    const [modal, setModal] = useState(false);
    const [estados, setEstados] = useState([]);
    const [ventaTotal, setVentaTotal] = useState(null)
    const [cantidadProducto, setCantidadProducto] = useState(0)
    const [cedulaCliente, setCedulaCliente] = useState(0)
    const [nombreCliente, setNombreCliente] = useState("")
    const [fechaVenta, setFechaVenta] = useState("0000/00/00")
    const [estadosVenta, setEstadosVenta] = useState("")
    const auth = useAuth();

    const getEstados = async () => {
        try {
            const { data } = await obtenerEstados(auth.token);
            setEstados(data.estados);
        } catch (error) {
            console.log(error);
        }
    }

    const updateVentas = async (dataS) => {
        try {
            const { status, data } = await actualizarVentas(auth.token,dataS);
            if (status === 200) {
                notie.alert({ text: data.msg, type: "success"});
                setModal(false);
                getVentas();
            }
        } catch ({ response: error }) {
            if (error.status === 400 && error.data.middleware) {
                notie.alert({ text: "Rellena todos los campos", type: "error" });
            }else{
                console.log(error);
            }
        }
    }

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
            <td> <input type="button" value="Editar" className="fields" onClick={() => {
                setModal(true);
                modalData[0] = venta.id;
                modalData[1] = venta.producto.id;
                modalData[2] = venta.producto.descripcion;
                modalData[3] = venta.producto.valorUnit;
                modalData[4] = venta.cantidad;
                modalData[5] = venta.cedulaCliente;
                modalData[6] = venta.nombreCliente;
                modalData[7] = venta.idVendedor.name;
                modalData[8] = venta.fechaDeVenta.slice(0, 10);
                modalData[9] = venta.valorTotal;
                modalData[10] = venta.estado._id;

                setCantidadProducto(modalData[4]);
                setCedulaCliente(modalData[5]);
                setNombreCliente(modalData[6]);
                setFechaVenta(modalData[8]);
                setVentaTotal(modalData[9]);
                setEstadosVenta(modalData[10]);

            }} /></td>
        </tr>
    ));

    useEffect(() => {
        getEstados();
    }, []);


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
                    {ventas.length > 0 ? listar_ventas : <tr><td colSpan={9}>No hay ventas registradas</td></tr>}
                </tbody>
            </table>

            <PureModal
                width="50vw"
                header="Actualizar venta"
                footer={
                    <div className="form-group">
                        <button id="button_create" className="button" onClick={(e) => {
                            let data = {
                                "id": modalData[0],
                                "cantidad": cantidadProducto,
                                "cedulaCliente": cedulaCliente,
                                "nombreCliente": nombreCliente,
                                "fechaDeVenta": fechaVenta,
                                "valorTotal": ventaTotal,
                                "estado": estadosVenta
                            };
                            updateVentas(data)
                        }}> Actualizar </button>
                    </div>
                }
                isOpen={modal}
                // closeButton="close"
                // closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }
                }
            >
                <form>
                    <div className="form-group">
                        <span> Id del producto </span>
                        <input disabled={true} type="number" name="id_producto" className="fields" defaultValue={modalData[1]} onChange={(e) => { }}></input>
                    </div>
                    <div className="form-group">
                        <span> Nombre del producto </span>
                        <input disabled={true} type="text" name="id_producto" className="fields" defaultValue={modalData[2]} onChange={(e) => { }}></input>
                    </div>
                    <div className="form-group">
                        <span> Precio unitario </span>
                        <input disabled={true} type="number" name="precio_producto" className="fields" defaultValue={modalData[3]} onChange={(e) => { }}></input>
                    </div>
                    <div className="form-group">
                        <span> Cantidad del producto </span>
                        <input type="number" name="cantidad_producto" className="fields" defaultValue={modalData[4]} onChange={(e) => {setVentaTotal(e.target.value * modalData[3]); setCantidadProducto(e.target.value)}}></input>
                    </div>
                    <div className="form-group">
                        <span> Valor de la venta </span>
                        <input disabled={true} type="number" name="valor_venta" className="fields" value={ventaTotal === null ? modalData[3] * modalData[4] : ventaTotal} onChange={(e) => { }}></input>
                    </div>
                    <div className="form-group">
                        <span> Cedula de cliente </span>
                        <input type="number" name="cedula_producto" className="fields" defaultValue={modalData[5]} onChange={(e) => { setCedulaCliente(e.target.value) }}></input>
                    </div>
                    <div className="form-group">
                        <span> Nombre de cliente </span>
                        <input type="text" name="nombre_producto" className="fields" defaultValue={modalData[6]} onChange={(e) => { setNombreCliente(e.target.value) }}></input>
                    </div>
                    <div className="form-group">
                        <span> Id de vendedor </span>
                        <input disabled={true} type="text" name="id_vendedor" className="fields" defaultValue={modalData[7]} onChange={(e) => { }}></input>
                    </div>
                    <div className="form-group">
                        <span> Fecha de venta </span>
                        <input type="date" name="fecha_producto" className="fields" defaultValue={modalData[8]} onChange={(e) => setFechaVenta(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <span> Estado </span>
                        <select name="estado_producto" className="fields" defaultValue={modalData[10]} onChange={(e) => setEstadosVenta(e.target.value)}>
                            {
                                estados.map((estado) => (
                                    <option value={estado._id} key={estado._id}> {estado.name} </option>
                                ))
                            }
                        </select>
                    </div>

                </form>
            </PureModal>

        </Fragment>
    );

}


export default Tabla_Ventas;