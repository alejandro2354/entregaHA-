import axios from 'axios';
const baseURL = process.env.React_App_API_Url;

const listarUsuarios = (token) => {
    try {
        return axios({
            method: 'GET',
            url: `${baseURL}/usuarios/`,
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

const obtenerRoles = (token) => {
    try {
        return axios({
            method: 'GET',
            url: `${baseURL}/usuarios/roles`,
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

const obtenerEstados = (token) => {
    try {
        return axios({
            method: 'GET',
            url: `${baseURL}/usuarios/estados`,
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}


const actualizarUsuarios = (token, id, rol, status) => {
    try {
        return axios({
            method: 'PUT',
            url: `${baseURL}/usuarios/${id}`,
            headers: {
                'x-token': `${token}`
            },
            data: {
                rol: `${rol}`,
                status: `${status}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

export { listarUsuarios, actualizarUsuarios, obtenerRoles, obtenerEstados };

