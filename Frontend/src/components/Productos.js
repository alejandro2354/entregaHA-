import React, { useState,  Fragment} from 'react'
import './Productos.css'
import AddProductos from './AddProductos'
import ProductList from './ProductList'

function Productos() {

    const [nameOrId, setNameOrId] = useState("")

    const filtrar = e => {
        e.preventDefault()
    }

    const [productos, setProductos] = useState([])
    
    const handleAddProductos = productoRegistrado => {
        setProductos([...productos, productoRegistrado])
        console.log(productos)
    };

    return (
        <Fragment>
            <h2 id="section_title"> Gestion de productos </h2>
            <div id="interactBar">
                <form onSubmit={filtrar}>
                    <div id="buscarID">
                        <input type="text"
                            id="input"
                            className="inputBuscarId"
                            placeholder="Nombre o ID Producto"
                            value={nameOrId}
                            onChange={e => setNameOrId(e.target.value)}
                        />
                        <button 
                            id="Boton">Buscar</button>
                    </div>
                </form>
                <AddProductos handleAddProductos={handleAddProductos}/>
            </div>
            <ProductList productos={productos}/>
        </Fragment>
    )
}



export default Productos