import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/Login.css';

export default function Signup() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const { username, password, confirmPassword } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Lógica para lidar com o envio do formulário de cadastro
        console.log(formData); // Aqui você pode implementar a lógica para enviar os dados para o backend
    };

    return (
        <div className="login-container">
            <div className="login-imagem">
                <img src="/./icons/logo_ionic_health.png" alt="" />
            </div>
            <div className="login-form">
                <div className="login-header-second">
                    <h2>Cadastro de Usuário</h2>
                </div>
                <form className="login-form-container" onSubmit={handleSubmit}>

                    <div className="login-form-container">
                        <input
                            className="login-input"
                            type="text"
                            autoComplete="off"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="E-mail"
                            required
                        />
                    </div>

                    <div className="login-form-container">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Senha"
                            minLength="6" // Defina o mínimo de caracteres necessário
                            required
                        />
                    </div>

                    <div className="login-form-container">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirme a senha"
                            minLength="6" // Defina o mínimo de caracteres necessário
                            required
                        />
                    </div>

                    <button type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
