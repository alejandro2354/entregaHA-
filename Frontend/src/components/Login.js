import React from "react";
import "./Login.css";
import icono from "./assets/icono-mercadolibrechanguero.png";
import iconoG from "./assets/icono-google.png";
import GoogleLogin from "react-google-login";
import axios from "axios"

export const Login = () => {
    const respuestaGoogle = async (resp) => {
        console.log(resp)
        try {
            const {data} = await axios({
                method:"POST",
                url: `http://localhost:4000/api/auth/google/login`,
                headers: {
                  "Authorization": `Bearer ${resp.tokenId}`
                }
              })
              console.log(data)
        } catch (error) {
            console.log(error.toJSON())
            console.log(error.response.data)
        }

    };

    return (
        <section className="login">
            <div className="container-general-login">
                <div className="container-brand">
                    <img src={icono} alt="Icono de la empresa" />
                    <h2>Inicia Sesión o Registrate</h2>
                </div>
                <div className="container-login">
                    <img src={iconoG} alt="Icono Google" />

                    <GoogleLogin
                        clientId="517368753938-8cagsbpid6ugvnlm1dcqljgjto4quj2g.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="login-button"
                            >
                                Autenticación con Google
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={respuestaGoogle}
                        /* isSignedIn={true} */
                        onFailure={respuestaGoogle}
                        cookiePolicy={"single_host_origin"}
                        
                    />
                </div>
            </div>
        </section>
    );
};
