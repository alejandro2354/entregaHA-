import React from 'react'

function ProductList({ productos }) {

    const chk = productos.map(item => (
        <tr>
            <td> {item.inID} </td>
            <td> {item.inDescription} </td>
            <td> {item.inUnitValue} </td>
            <td> {item.estadoValue} </td>
            <td> <button class="actions">Editar</button>  </td>
        </tr>
    ));

    return (
        <table id="tableUsers">
            <tr>
                <th> Identficador </th>
                <th> Descripcion </th>
                <th> Valor unitario </th>
                <th> Estado </th>
                <th> Acciones </th>
            </tr>
            {productos.length ? chk : ""}
            {productos.length ? (
                <p>
                </p>
            ) : null}
        </table>
    )
}

export default ProductList
