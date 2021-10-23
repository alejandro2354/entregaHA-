import React from "react";
import logo from "./assets/icono-mercadolibrechanguero.png";
import comida from "./assets/comida.png";
import herramienta from "./assets/herramienta.jpg";
import juguete1 from "./assets/juguete1.png";
import juguete2 from "./assets/juguete2.png";
import "./Inicio.css";

const Inicio = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="container">
            <h1 className="container-titulo">
                <span className="container-span-bienvenido">Bienvenido</span>
                <br />
                <span className="container-span-nombre">
                    {user.name}
                </span>{" "}
                <br />
            </h1>
            <div className="container-imagenes">
                <img className="imagen-logo" src={logo} alt="Logo" />
                <div className="container-otrasImagen">
                    <img className="imagen-juguete2" src={juguete2} alt="Juguete2" />
                    <img className="imagen-comida" src={comida} alt="Comida" />
                    <img className="imagen-herramienta" src={herramienta} alt="Herramienta" />
                    <img className="imagen-juguete1" src={juguete1} alt="Juguete1" />
                </div>
            </div>
        </div>
    );
};

export default Inicio;
