import axios from 'axios';
import React, { useState } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';
import { authenticateUser } from '../../services/auth';
import LoginForm from '../../components/form/LoginForm';
import { Navigate } from 'react-router-dom';
import { User } from '../../types/userTypes';

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    console.log('Dados recebidos do formulário:', email, password);

    try {
      const { user, loggedIn, isAdmin } = await authenticateUser({ email, password });

      if (loggedIn) {
        setIsLoggedIn(true);
        setIsAdmin(isAdmin);
      } else {
        setLoginError('Verifique as credenciais inseridas');
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      setLoginError('Falha na autenticação');
    }
  };

  if (isLoggedIn) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

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
