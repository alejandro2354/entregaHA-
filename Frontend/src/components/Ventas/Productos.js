import React, { Fragment } from 'react'
import Datos from './Datos'
import Entrada from './Entrada'
import Registrar from './Registrar'
import TDatos from './TDatos'

function Productos() {
    return (
        <Fragment>
            <div className="TituloProductos">Ventas activas</div>
            <div className="interactBar">
                <form>
                    <Entrada />
                </form>

            </div>
            <table className="tableUsers">
                <TDatos />
                <Datos />
                <Datos />
                <Datos />
            </table>
            <div className="agregar">
                <Registrar />
            </div>
        </Fragment>

    )
}

export default Productos
