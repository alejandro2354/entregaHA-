import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

import Main from "./Main";
import "./Navbar.css";

function Navbar() {
    const auth = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Router>
            <nav>
                <h2 id="nav-title"> NAVEGACION </h2>
                <div id="nav-items">
                    <Link to="/Productos" className="nav-item">
                        {" "}
                        <i className="fas fa-shopping-cart"></i> Gestionar
                        productos{" "}
                    </Link>
                    <Link to="/Ventas" className="nav-item">
                        {" "}
                        <i className="fas fa-suitcase"></i> Gestionar ventas{" "}
                    </Link>
                    {(auth.isLogged() && (user.rol === "Administrador")) && (
                        <Link to="/Usuarios" className="nav-item">
                            {" "}
                            <i className="fas fa-user"></i> Gestionar usuarios{" "}
                        </Link>
                    )}
                </div>
            </nav>
            <Switch>
                <Route path="/Productos">
                    <Main component="1" />
                </Route>
                <Route path="/Ventas">
                    <Main component="2" />
                </Route>
                <Route path="/Usuarios">
                    <Main component="3" />
                </Route>
            </Switch>
        </Router>
    );
}
export default Navbar;
