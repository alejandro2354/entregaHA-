import './Header.css';

function Header() {
    return (
        <header>
            <a href="" id="header-brand"> Mercadolibre changuero</a>
            <div id="header-right">
                <a href=""> Inicio </a>
                <i className="fas fa-user-circle" id="header-user-img"></i>
                <div id="header-right-content">
                    <a href=""> Usuario </a>
                    <a href=""> Cerrar sesion </a>
                </div>
            </div>
        </header>
    );
  }
  
  export default Header;