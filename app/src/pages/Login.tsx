import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/Login.css' ;
export default function Login() {

    return (
        <div className = "login-container" >
        <div className = "login-imagem">
        <img src       = "/./icons/logo_ionic_health.png" alt = "" />
        </div>
        <div className = "login-form">
            
            <div className = "login-header-second">
               
            </div>
            <form className = "login-form-container" method = 'post' >

                <div className = "login-form-container">
                    
                </div>

                    <input className = "login-input"
                           type      = "text"
                    
                    autoComplete = 'off'
                    name         = "username"
                    id           = "username"
                    placeholder  = "E-mail" />

                <div className = "login-form-container">
                    
                </div>

                <input type = "password"
                       name = "senha"
                    
                    id          = "senha"
                    placeholder = "Senha" />

                <div className = "login-form-recuperar">
                <a   className = "login-form-recuperar" href = "/recuperar_senha">Esqueceu sua senha?</a>
                </div>
                <button type = "button" >Entrar</button>

            </form>

        </div>

        
    </div>

    );
}