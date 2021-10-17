import React from "react";

export const UsuarioHeader = ({ user }) => {
    console.log(user);
    return (
        <div className="userDatos">
            <div className="datos">{user.rol}</div>
            <div className="datos">{user.name}</div>
        </div>
    );
};
