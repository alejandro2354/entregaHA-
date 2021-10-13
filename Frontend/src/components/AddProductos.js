import React, { useState } from 'react'

const AddProductos = ( { handleAddProductos } ) => {

    const [inID, setInID] = useState("")

    const [inDescription, setInDescription] = useState("")

    const [inUnitValue, setInUnitValue] = useState("")

    const [estadoValue, setEstadoValue] = useState("Disponible")

    const disbl = (inID, inDescription, inUnitValue) => {
        if (inID !== "") {
            if (inDescription !== "") {
                if (inUnitValue !== "") {
                    return "able"
                }
            }
        }
        return ""
    }

    const registrarProducto = e => {
        e.preventDefault()

        handleAddProductos({
            inID,
            inDescription,
            inUnitValue,
            estadoValue
        })

        setInID("")
        setInDescription("")
        setInUnitValue("")

    }

    return (

        <form onSubmit={registrarProducto}>
            <div id="NuevoProducto">
                <input type="text"
                    id="input"
                    className="InputId"
                    placeholder="Identficador"
                    value={inID}
                    onChange={e => setInID(e.target.value)}
                />
                <input type="text"
                    id="input"
                    className="entradaTest"
                    placeholder="Descripción"
                    value={inDescription}
                    onChange={e => setInDescription(e.target.value)}
                />
                <input type="text"
                    id="input"
                    className="entradaTest"
                    placeholder="Valor unitario"
                    value={inUnitValue}
                    onChange={e => setInUnitValue(e.target.value)}
                />
                <select className="EstadoP"
                    id="input">
                    <option
                        onChange={e => setEstadoValue(e.target.value)}
                        value={"Disponible"}
                    > Disponible </option>
                    <option
                        onChange={e => setEstadoValue(e.target.value)}
                        value={"No disponible"}
                    > No Disponible </option>
                </select>
                <button
                    id="Boton"
                    disabled={disbl(inID, inDescription, inUnitValue) ? "" : "disabled"}
                >Guardar producto
                </button>
            </div>
        </form>
    )
}

export default AddProductos