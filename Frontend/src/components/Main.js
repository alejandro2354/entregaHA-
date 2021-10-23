import React from "react";
import Usuarios from "./Usuarios";
import "./Main.css";
import Productos from "./Productos";
import Ventas from "./Ventas";
import Inicio from "./Inicio";

const Main = (props) => {
    switch (props.component) {
        case "1":
            return (
                <div id="main_section">
                    <Productos />
                </div>
            );
        case "2":
            return (
                <div id="main_section">
                    <Ventas />
                </div>
            );
        case "3":
            return (
                <div id="main_section">
                    <Usuarios />
                </div>
            );
        case "4":
            return (
                <div id="main_section">
                    <Inicio />
                </div>
            );
        default:
            return <></>;
    }
};

export default Main;
