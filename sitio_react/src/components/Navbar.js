import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <h2 id="nav-title"> NAVEGACION </h2>
            <div id="nav-items">
                <a href="" className="nav-item"> <i className="fas fa-shopping-cart"></i> Administrar productos </a>
                <a href="" className="nav-item"> <i className="fas fa-user-tie"></i> Gestionar ventas </a>
                <a href="../src/components/gestion_usuarios/users.html" className="nav-item"> <i className="fas fa-user"></i> Gestionar usuarios </a>
            </div>
        </nav>
        
    );
}
  export default Navbar;
  