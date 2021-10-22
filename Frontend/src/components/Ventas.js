import { Fragment } from 'react';
import './Ventas.css';
import Listar from './Ventas/Listar';

function Ventas() {
    return (
        <Fragment>
            <h2 id="section_title"> Gestion de ventas </h2>
            <div id="section_filter">
                <div className="form-group">
                    <span> Id del producto </span>
                    <input type="number" name="id_producto" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Precio unitario </span>
                    <input type="number" name="precio_producto" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Cantidad del producto </span>
                    <input type="number" name="cantidad_producto" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Cedula de cliente </span>
                    <input type="number" name="cedula_producto" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Nombre de cliente </span>
                    <input type="text" name="nombre_producto" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Id de vendedor </span>
                    <input type="text" name="id_vendedor" className="fields"></input>
                </div>
                <div className="form-group">
                    <span> Fecha de venta </span>
                    <input type="date" name="fecha_producto" className="fields"></input>
                </div>
                <div className="form-group">
                <button id="button_create" className="button"> Crear </button>
                </div>

            </div>
            <Listar/>
        </Fragment>
    );
}

export default Ventas;