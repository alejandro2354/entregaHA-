import React from "react";
import "./Login.css";
import icono from "./assets/icono-mercadolibrechanguero.png";
import iconoG from "./assets/icono-google.png";
import GoogleLogin from "react-google-login";
import axios from "axios"
import notie from "notie"
import useAuth from "../auth/useAuth";


export const Login = () => {
    const baseURL = process.env.REACT_APP_API_URL;
    const auth = useAuth()
    const respuestaGoogle = async (resp) => {
        if(!resp.error){
            try {
                const {status, data} = await axios({
                    method:"POST",
                    url: `${baseURL}/auth/google/login`,
                    headers: {
                      "Authorization": `Bearer ${resp.tokenId}`
                    }
                  })
                  if(status === 200){
                    auth.set_Token(data.token)
                    auth.set_User({name: data.name, uid: data.uid, picture: data.picture, rol: data.rol})
                  }
                  else if(status === 201){
                    notie.alert({text: data.msg, type: "success"})
                  }
            } catch (error) {
                if(error.response.status === 401){
                    notie.alert({text: error.response.data.msg, type: "warning", time: 8})
                }else{
                    notie.alert({text: error.response.data.msg, type: "error", time: 8})
                }
                console.log(error.toJSON())
                console.log(error.response.data)
            }
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
