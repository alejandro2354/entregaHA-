import React from "react";

function ProductList({ productos }) {
    const chk = productos.map((item) => (
        <tr key={item.id}>
            <td> {item.id} </td>
            <td> {item.descripcion} </td>
            <td> {item.valorUnit} </td>
            <td> {item.estado === true ? "Disponible" : "No Disponible"} </td>
            <td>
                {" "}
                <button className="actions">Editar</button>{" "}
            </td>
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
            {/* {productos.length ? <p></p> : null} */}
        </table>
    );
}

export default ProductList;
