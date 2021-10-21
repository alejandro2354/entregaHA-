import axios from "axios";
import React, { useState, Fragment, useEffect } from "react";
import useAuth from "../auth/useAuth";
import "./Productos.css";
import AddProductos from "./Productos/AddProductos";
import ProductList from "./Productos/ProductList";
import notie from "notie"

const useContador = (inicial) => {
    const [contador, setContador] = useState(inicial);
    const actualizarContador = () => {
        setContador(contador + 1);
    };
    return [contador, actualizarContador];
};

function Productos() {
    const auth = useAuth();
    const [nameOrId, setNameOrId] = useState("");
    const [productos, setProductos] = useState([]);
    const [contador, actualizarContador] = useContador(0);

    const filtrar = (e) => {
        e.preventDefault();
    };

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
        } catch (error) {
            console.log(error);
        }
        setProductos([...getProductos]);

    };

    useEffect(() => {
        listarProductos()
    }, [contador]);

    const buscarProducto = async () => {
        let getProducto
        try {
            const {status, data} = await axios({
                method: "POST",
                url: "http://localhost:4000/api/productos/buscarProducto",
                headers: {
                    "x-token": `${auth.token}`,
                },
                data: {
                    id: `${nameOrId}`
                }
            })
            if(status===202){
                getProducto = data.producto
            }
        } catch (error) {
            if(error.response.status === 404){
                notie.alert({text: error.response.data.msg, type: "warning", time: 8})
            }
            else{
                notie.alert({text: error.response.data.msg, type: "error", time: 8})
            }
        }
        if(getProducto != null){

            setProductos([getProducto])
        }
    }

    return (
        <Fragment>
            <h2 id="section_title"> Gestion de productos </h2>
            <div id="interactBar">
                <form onSubmit={filtrar}>
                    <div id="buscarID">
                        <input
                            type="text"
                            id="input"
                            className="inputBuscarId"
                            placeholder="Nombre o ID Producto"
                            value={nameOrId}
                            onChange={(e) => setNameOrId(e.target.value)}
                        />
                        <button id="Boton" onClick={buscarProducto}>Buscar</button>
                    </div>
                </form>
                <AddProductos actualizarContador={actualizarContador} />
            </div>
            <ProductList productos={productos} />
        </Fragment>
    );
}

export default Productos;
