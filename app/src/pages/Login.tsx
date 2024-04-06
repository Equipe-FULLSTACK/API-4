import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/Login.css' ;
export default function Login() {

    return (
        <div className="login-container" id="fundo">
        <div className="login-imagem">
            <img src="/./icons/logo_ionic_health.png" alt="" />
        </div>
        <div className="login-form">
            <div className="login-header-main">
                Bem Vindo
            </div>
            <div className="login-header-second">
                Acesso sistema de gerenciamento de processos e tarefas da empresa
            </div>
            <form className="login-form-container" method='post' >

                <div className="login-form-container">
                    <p>Login</p>
                </div>

                <input className="login-input"
                    type="text"
                    
                    autoComplete='off'
                    name="username"
                    id="username"
                    placeholder="Login" />

                <div className="login-form-container">
                    <p>Senha</p>
                </div>

                <input type="password"
                    name="senha"
                    
                    id="senha"
                    placeholder="Senha" />

                <div className="login-form-recuperar">
                    <a className="login-form-recuperar" href="/recuperar_senha">Esqueceu sua senha?</a>
                </div>
                <button type="button" >Entrar</button>

            </form>

        </div>

        
    </div>

    );
}