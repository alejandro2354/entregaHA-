import axios from 'axios';
const listarUsuarios = (token) => {    
    try {
        return axios({
            method: 'GET',
            url: 'http://localhost:4000/api/usuarios/',
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
            url: 'http://localhost:4000/api/usuarios/roles',
            headers: {
                'x-token': `${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

const actualizarUsuarios = (token, id, rol) => {    

    try {
        return axios({
            method: 'PUT',
            url: `http://localhost:4000/api/usuarios/:${id}`,
            headers: {
                'x-token': `${token}`
            },
            data:{
                rol: `${rol}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

export {listarUsuarios, actualizarUsuarios, obtenerRoles};

