import React, { useState } from "react";
import notie from "notie"
import useAuth from "../../auth/useAuth";
import axios from "axios";

//Actualiza la opcion de estado del producto
const useEstado = (inicial) => {
    const [estadoValue, setEstadoValue] = useState(inicial);
    const setEstado = () => {
        setEstadoValue(!estadoValue)
    }
    return [estadoValue, setEstado]
}


const AddProductos = ({actualizarContador }) => {
    const auth = useAuth()

    const [inID, setInID] = useState("");

    const [inDescription, setInDescription] = useState("");

    const [inUnitValue, setInUnitValue] = useState("");
    
    const [estadoValue, setEstado] = useEstado(true)


    const disbl = (inID, inDescription, inUnitValue) => {
        if (inID !== "") {
            if (inDescription !== "") {
                if (inUnitValue !== "") {
                    return "able";
                }
            }
        }
        return "";
    };

    const registrarProducto = async (e) => {
        e.preventDefault();
        try {
            const {status, data} = await axios({
                method:"POST",
                url: `http://localhost:4000/api/productos/crearProducto`,
                headers: {
                    "x-token": `${auth.token}`
                },
                data: {
                    id: `${inID}`,
                    descripcion: `${inDescription}`,
                    valorUnit: `${inUnitValue}`,
                    estado: `${estadoValue}`
                } 

            })
            if(status === 201) {
                notie.alert({text: data.msg, type: "success"})
                actualizarContador()
            }
        } catch (error) {
            console.log(error)
        }
        setInID("")
        setInDescription("")
        setInUnitValue("")
    }

    return (
        <React.Fragment>
            
            <form onSubmit={registrarProducto}>
            <div id="NuevoProducto">
                    <input
                        type="text"
                        id="input"
                        className="InputId"
                        placeholder="Identficador"
                        value={inID}
                        onChange={(e) => setInID(e.target.value)}
                    />
                    <input
                        type="text"
                        id="input"
                        className="entradaTest"
                        placeholder="Descripción"
                        value={inDescription}
                        onChange={(e) => setInDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        id="input"
                        className="entradaTest"
                        placeholder="Valor unitario"
                        value={inUnitValue}
                        onChange={(e) => setInUnitValue(e.target.value)}
                    />
                    <select className="EstadoP" id="input" onChange={setEstado}>
                        <option 
                        >
                            {" "}
                            Disponible{" "}
                        </option>
                        <option
                        >
                            {" "}
                            No Disponible{" "}
                        </option>
                    </select>
                    <button
                        id="Boton"
                        disabled={
                            disbl(inID, inDescription, inUnitValue)
                                ? ""
                                : "disabled"
                        }
                    >
                        Guardar producto
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AddProductos;
