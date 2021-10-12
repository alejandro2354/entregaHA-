import React from 'react'
import './Login.css'
import icono from "./assets/icono-mercadolibrechanguero.png"
import iconoG from "./assets/icono-google.png"

export const Login = () => {
    return (
        <section className="login">
        <div className="container-general-login">
          <div className="container-brand">
            <img
              src={icono}
              alt="Icono de la empresa"
            />
            <h2>Inicia Sesión o Registrate</h2>
          </div>
          <div className="container-login">
            <img
              src={iconoG}
              alt="Icono Google"
            />
            <a href="/Index"><input type="button" value="Autenticación con Google" name="acceder" id="acceder"></input> </a>
          </div>
        </div>
      </section>
    )
}
