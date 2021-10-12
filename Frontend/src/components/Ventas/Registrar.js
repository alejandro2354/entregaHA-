import React from 'react'

function Registrar() {
    return (
        <section className="seccionfinal">
            <ul>
                <ul>
                   <button className="finalizar">Identificador de venta</button>
                   <input  id="filter" type="text" name="producto" placeholder=""></input>
                </ul>
                <ul>
                   <button className="finalizar">Producto</button>
                   <input id="filter" type="text" name="producto" placeholder=""></input>
                </ul>
                <ul>
                   <button className="finalizar">Valor</button>
                   <input id="filter" type="text" name="producto" placeholder=""></input>
                </ul>
                <ul>
                   <button className="finalizar">ID. Cliente</button>
                   <input id="filter" type="text" name="producto" placeholder=""></input>
                </ul>
                <ul>
                   <button className="finalizar">Nombre Cliente</button>
                   <input id="filter" type="text" name="producto" placeholder=""></input>
                </ul>
                <ul>
                    <button className="registrarventa">Registrar venta</button>
                </ul>
               
            </ul>
        </section>
    )
}

export default Registrar
