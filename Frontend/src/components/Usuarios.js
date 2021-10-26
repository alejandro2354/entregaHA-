import { Fragment} from 'react';
import './Usuarios.css';
import Listar from './Usuarios/Listar';

function Usuarios() {
    return (
        <Fragment>
            <h2 id="section_title"> Gestion de usuarios </h2>
            <Listar/>
        </Fragment>
    );
}

export default Usuarios;