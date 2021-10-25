import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Autocompletado.css"

export default function Autocompletado({nombreAutocompletado, productos, handleProductoSelected}) {
    const [buscar, setBuscar] = useState("")
    const [selectProducto, setSelectProducto] = useState(null)
    const [mostrar, setMostrar] = useState(true)

    const list = productos.map((producto, index) => {
        if (buscar.length >= 2){
            if(producto.estado){
                let nombreProducto = producto.descripcion.toLowerCase()
                if (nombreProducto.indexOf(buscar.toLocaleLowerCase()) !== -1) {
                    return (<li key={producto.id} onClick={e => (setSelectProducto(index))}>{producto.descripcion}</li>)
                }else{
                    return null
                }
            }else{
                return null
            }
        }else {
            return null
        }
    })
    const styles = {
        mostrar: {
            display: mostrar ? "block" : "none"
        }
    }
    const input = () => {
        if (selectProducto !== null) {
            return (
                <input type="text" autoComplete="off" onChange={e => {setBuscar(e.target.value); setSelectProducto(null); setMostrar(true)}} value={productos[selectProducto].descripcion} placeholder={nombreAutocompletado} name={nombreAutocompletado} className="fields"></input>
            )
        } else {
            return (
                <input type="text" autoComplete="off" onChange={e => setBuscar(e.target.value)} placeholder={nombreAutocompletado} value={buscar} name={nombreAutocompletado} className="fields"></input>
            )
        }
    }


    useEffect(() => {
        input()
        handleProductoSelected(selectProducto)
    }, [selectProducto])

    return (
        <label className="autocompletado">
            {nombreAutocompletado} <br/>
            {input()}
            <ul className="autocompletado-results" style={styles.mostrar} onClick={e => {setMostrar(false); }} >
                {productos.length > 0 ? list : null }   
            </ul>
        </label>

    )
}
