import axios from "axios";

const listarVentas =  (token) => {
    try {
        return axios({
            method: "GET",
            url: "http://localhost:4000/api/ventas/listarVentas",
            headers: {
                "x-token": `${token}`,
            }
        });
    } catch (error) {
        console.log(error);
    }
};


const listarProductos = (token) => {
    try {
        return axios({
            method: "GET",
            url: "http://localhost:4000/api/productos/listarProductos",
            headers: {
                "x-token": `${token}`,
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const crearVenta = (token, venta ) => {
    try {
        return axios({
            method: "POST",
            url: "http://localhost:4000/api/ventas/crearVenta",
            headers: {
                "x-token": `${token}`,
            },data: {
                ...venta
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const obtenerEstados = (token) => {
    try {
        return axios({
            method: 'GET',
            url: 'http://localhost:4000/api/ventas/estados',
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

const actualizarVentas =  (token, data) => {
    console.log("actualizarVentas")
    try {
        return axios({
            method: "POST",
            url: "http://localhost:4000/api/ventas/actualizarVenta",
            headers: {
                "x-token": `${token}`,
            },
            data : data
        });
    } catch (error) {
        console.log(error);
    }
};



export { listarVentas, crearVenta, listarProductos, obtenerEstados, actualizarVentas };