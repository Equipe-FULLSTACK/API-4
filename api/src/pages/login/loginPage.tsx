import React from 'react';
import LoginForm from '../../components/form/LoginForm';
import { Stack } from '@mui/material';

const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log(`Email Senha Teste: ${email}, password: ${password}`);
  };

  return (
    <Stack width={400} margin={'auto'}>
      <LoginForm onLogin={handleLogin} />
    </Stack>
  );
};

export default LoginPage;
