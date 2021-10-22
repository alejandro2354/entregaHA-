import React from 'react'
import Usuarios from './Usuarios'
import './Main.css'
import Productos from './Productos';
import Ventas from './Ventas';

const Main = (props) => {
    switch (props.component) {
        case "1":
            return (
                <div id="main_section">
                    <Productos/>
                </div>
            );
        case "2":
            return (
                <div id="main_section">
                    <Ventas/>
                </div>
            );
        case "3":
            return (
                <div id="main_section">
                    <Usuarios />
                </div>
            );
        default:
            return (<> </>);
    }

}

export default Main;


