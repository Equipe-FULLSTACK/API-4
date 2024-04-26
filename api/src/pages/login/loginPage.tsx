import React, { useState } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material'; // Importando componentes do Material UI
import { authenticateUser } from '../../services/auth';
import LoginForm from '../../components/form/LoginForm';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    /* console.log('Dados recebidos do formulário:', email, password); */
  
    try {
      const loggedInUser = await authentinpcateUser({ email, password });
  
      if (loggedInUser) {
        setIsLoggedIn(true); 
      } else {
        setLoginError('Verifique as credenciais inseridas');
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      setLoginError('Falha na autenticação');
    }
  };


  // Redireciona para a página admin se estiver logado
  if (isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  return (
    <Stack width={400} margin={'auto'}>
      <LoginForm onLogin={handleLogin} />
      {loginError && (
        <Snackbar open={true} autoHideDuration={2}>
          <Alert severity="error">{loginError}</Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default LoginPage;
