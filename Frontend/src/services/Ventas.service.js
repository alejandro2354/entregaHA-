import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const listarVentas =  (token) => {
    try {
        return axios({
            method: "GET",
            url: `${baseURL}/ventas/listarVentas`,
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
            url: `${baseURL}/productos/listarProductos`,
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
            url: `${baseURL}/ventas/crearVenta`,
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
            url: `${baseURL}/ventas/estados`,
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

const actualizarVentas =  (token, data) => {
    try {
        return axios({
            method: "POST",
            url: `${baseURL}/ventas/actualizarVenta`,
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