import { Fragment} from 'react';
import './Usuarios.css';
import Listar from './Usuarios/Listar';

function Usuarios() {
    return (
        <Fragment>
            <h2 id="section_title"> Gestion de usuarios </h2>
            <div id="section_filter">
                <input type="text" placeholder="Nombre del usuario.." id="name_filter"></input>
                <button id="button_filter" className="button"> Buscar </button>
            </div>
            <Listar/>
        </Fragment>
    );
}

export default Usuarios;