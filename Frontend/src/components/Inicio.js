/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { listarVentas } from "../services/Ventas.service";
import logo from "./assets/icono-mercadolibrechanguero.png";
import comida from "./assets/comida.png";
import herramienta from "./assets/herramienta.jpg";
import juguete1 from "./assets/juguete1.png";
import juguete2 from "./assets/juguete2.png";
import "./Inicio.css";
import useAuth from "../auth/useAuth";

const Inicio = () => {
    const auth = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));
    const [ventas, setVentas] = React.useState([]);

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

    const gananciasTotales = () => {
        let total = 0;
        ventas.map((venta) => (total = total + venta.valorTotal));
        return total;
    };

    const gananciasDiarias = () => {
        let total = 0;
        let fecha = new Date();
        let fechaActual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        ventas.map(venta => (venta.fechaDeVenta === fechaActual ? (total = total + venta.valorTotal) : null));
        return total;
    }

    return (
        <div className="container">
            <h1 className="container-titulo">
                <span className="container-span-bienvenido">Bienvenido</span>
                <br />
                <span className="container-span-nombre">{user.name}</span>{" "}
                <br />
            </h1>
            <div className="container-imagenes">
                <img className="imagen-logo" src={logo} alt="Logo" />
                <div className="container-ganancias">
                    <div className="container-ganancias-totales">
                        <h3>Ganancias Totales</h3>
                        <h1>${gananciasTotales()}</h1>
                    </div>
                    <div className="container-ganancias-diarias">
                        <h3>Ganancias del dia</h3>
                        <h1>${gananciasDiarias()}</h1>
                    </div>
                </div>
                <div className="container-otrasImagen">
                    <img
                        className="imagen-juguete2"
                        src={juguete2}
                        alt="Juguete2"
                    />
                    <img className="imagen-comida" src={comida} alt="Comida" />
                    <img
                        className="imagen-herramienta"
                        src={herramienta}
                        alt="Herramienta"
                    />
                    <img
                        className="imagen-juguete1"
                        src={juguete1}
                        alt="Juguete1"
                    />
                </div>
            </div>
        </div>
    );
};

export default Inicio;
