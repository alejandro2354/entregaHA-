import React, { Fragment, useState } from "react";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './Listar.css'

const Tabla_Ventas = () => {
    const [modal, setModal] = useState(false);

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
                    <tr>
                        <td> 1</td>
                        <td> 1</td>
                        <td> Azucar</td>
                        <td> 1000</td>
                        <td> 3</td>
                        <td> 1016845748</td>
                        <td> Hernesto</td>
                        <td> 12345</td>
                        <td> 10/20/1009</td>
                        <td> 3000</td>
                        <td> En proceso</td>
                        <td> <input type="button" value="Editar" className="fields" onClick={() => setModal(true)} /></td>
                    </tr>

                </tbody>
            </table>
            <PureModal
                width="50vw"
                header="Actualizar producto"
                footer={
                    <div className="form-group">
                        <button id="button_create" className="button"> Actualizar </button>
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
                        <input type="number" name="id_producto" className="fields"></input>
                    </div>
                    <div className="form-group">
                        <span> Nombre del producto </span>
                        <input type="text" name="id_producto" className="fields"></input>
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


                </form>
            </PureModal>
        </Fragment>
    );

}


export default Tabla_Ventas;