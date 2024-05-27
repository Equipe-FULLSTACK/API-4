import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';
import { authenticateUser } from '../../services/auth';
import LoginForm from '../../components/form/LoginForm';
import { Navigate, redirect } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserStatus } = useUser()

  const handleLogin = async (email: string, password: string) => {
    console.log('Dados recebidos do formulário:', email, password);

    try {
      setLoading(true);
      const { loggedId, loggedIn, isAdmin } = await authenticateUser({ email, password }, setUserStatus);
      
      if (loggedIn) {
        setIsLoggedIn(true);
        setIsAdmin(isAdmin);
      } else {
        setLoginError('Verifique as credenciais inseridas');
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      setLoginError('Falha na autenticação');
    } finally {
      setLoading(false);
    }
  };

  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {

    axios
      .get("http://localhost:3000/ck")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
          setSelectedRole(res.data.role);
        }
         console.log(res);
      })
      .catch((err) => console.log(err));


    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ck');
        console.log(response);
        const userData = response.data;

        // Verificar se o usuário é administrador e redirecionar de acordo
        if (userData.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        if (isLoggedIn) {
          
          window.location.href = 'http://localhost:3000/zoom/auth';
  };

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  

  return (
    <Stack width={400} margin={'auto'}>
      <LoginForm onLogin={handleLogin} />
      {loginError && (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error">{loginError}</Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default LoginPage;