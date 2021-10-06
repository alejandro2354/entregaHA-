import React from 'react'

function Navegacion() {
    return (
        <nav className="navbar">
            <div className="tituloNav">
                Navegación
                <div>
                </div>
            </div>
            <div className="divOpsNav">
                <ol className="OpsNav">Administrador de Productos</ol>
                <ol className="OpsNav">Administrador de Ventas</ol>
                <ol className="OpsNav">Administrador de Usuarios</ol>
            </div>
        </nav>
    )
}

export default Navegacion
