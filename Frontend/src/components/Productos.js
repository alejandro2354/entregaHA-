import React, { Fragment } from 'react'
import './Productos.css';

function Productos() {
    return (
        <Fragment>
            <div id="TituloProductos">Productos</div>
            <div id="interactBar">
                <form>
                    <div id="buscarID">
                        <input type="text"
                            id = "input"
                            className="inputBuscarId"
                            value={'ID Producto'}
                        />
                        <button className="botonBuscar"
                        id="Boton">Buscar</button>
                    </div>
                </form>
                <form>
                    <div id="NuevoProducto">
                        <input type="text"
                            id = "input"
                            className="InputId"
                            value={'Identficador'}
                        />
                        <input type="text"
                            id = "input"
                            className="entradaTest"
                            value={'Descripción'}
                        />
                        <input type="text"
                            id = "input"
                            className="entradaTest"
                            value={'Valor unitario'}
                        />
                        <select className="EstadoP"
                        id = "input">
                            <option value="Disponible"> Disponible </option>
                            <option value="NoDisponible"> No Disponible </option>
                        </select>
                        <button id="Boton">
                            Guardar producto
                        </button>
                    </div>
                </form>
            </div>
            <table id="tableUsers">
                <tr>
                    <th> Identficador </th>
                    <th> Descripcion </th>
                    <th> Valor unitario </th>
                    <th> Estado </th>
                    <th> Acciones </th>
                </tr>
                <tr>
                    <td> 123456679 </td>
                    <td> Panela </td>
                    <td> 10 $ </td>
                    <td> Disponible </td>
                    <td> <button class="actions">Editar</button>  </td>
                </tr>
                <tr>
                    <td> 123456679 </td>
                    <td> Panela </td>
                    <td> 10 $ </td>
                    <td> Disponible </td>
                    <td> <button class="actions">Editar</button>  </td>
                </tr>
                <tr>
                    <td> 123456679 </td>
                    <td> Panela </td>
                    <td> 10 $ </td>
                    <td> Disponible </td>
                    <td> <button class="actions">Editar</button>  </td>
                </tr>
            </table>
        </Fragment>
    )
}

export default Productos