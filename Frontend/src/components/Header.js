import useAuth from '../auth/useAuth';
import './Header.css';
import { ImageHeader } from './ImageHeader';
import { UsuarioHeader } from './UsuarioHeader';

function Header() {
    const auth = useAuth()
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <header>
            <a href="/Index" id="header_brand"> Mercadolibre changuero</a>
            <div id="header_right">
                    <UsuarioHeader user={user}/>
                    <ImageHeader user={user}/>
                    <div id="header_right_content">
                        <a className="a-Inicio" href="/Index"> Inicio </a>
                        <button className="btn-CerrarSesion" onClick={auth.logout}>Cerrar sesión</button>
                    </div>
            </div>
        </header>
    );
}

export default Header;