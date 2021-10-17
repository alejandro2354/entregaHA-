import useAuth from '../auth/useAuth';
import './Header.css';


function Header() {
    const auth = useAuth()
    return (
        <header>
            <a href="/Index" id="header_brand"> Mercadolibre changuero</a>
            <div id="header_right">
                    <a href="/Index"> Inicio </a>
                    <i className="fas fa-user-circle" id="header_user_img"></i>
                    <div id="header_right_content">
                        <span> Usuario </span>
                        <button onClick={auth.logout}>Cerrar sesion</button>
                    </div>
            </div>
        </header>
    );
}

export default Header;