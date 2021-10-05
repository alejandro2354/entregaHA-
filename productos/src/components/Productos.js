import React from 'react'
import Datos from './Datos'
import Entrada from './Entrada'
import TDatos from './TDatos'

function Productos() {
    return (
        <div className="seccionPag">
            <div className="TituloProductos">Productos</div>
            <div className="interactBar">
                <form>
                    <Entrada />
                </form>
                <div className="addProduct">
                    <button>
                        Nuevo Producto
                    </button>
                </div>
            </div>
            <table className="tableUsers">
                <TDatos />
                <Datos />
                <Datos />
                <Datos />
            </table>
        </div>
    )
}

export default Productos
