import React, { useState } from 'react';
import SIATTLogo from '../../assets/icons/siatt_logo.png';
import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Stack,
  Link,
} from '@mui/material';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onLogin(email, password);
    /* console.log('LoginForm - Email' + email + 'Senha -' + password ) */
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="login-form">
        <Stack width={200} padding={1} margin={'auto'} marginBottom={3} marginTop={3} sx={{ animation: 'spin 2s linear infinite' }}>
          <img src={SIATTLogo} alt="" />
        </Stack>
        <Stack marginBottom={3}>
          <Typography variant="h4">Bem vindo</Typography>
          <Typography variant="caption">
            Sistema de gestão e controle de reuniões e salas corporativas.
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={setEmail} onValidChange={setIsEmailValid} />
          <PasswordInput value={password} onChange={setPassword} onValidChange={setIsPasswordValid} />

          <Stack textAlign={'right'}>
            <Link href="#" underline='hover'>
              <Typography variant="body1" color="yellow">
                Esqueceu Senha?
              </Typography>
            </Link>
          </Stack>
          <SubmitButton onClick={handleSubmit} disabled={!isEmailValid || !isPasswordValid} />

          <Stack marginTop={5}>
            <Typography variant="button" textAlign={'center'} alignItems={'center'}>
              Não possui acesso?
            </Typography>

            <Typography variant="body1" textAlign={'center'} alignItems={'center'} color={'yellow'}>
              Solicite ao administrador do sistema.
            </Typography>
          </Stack>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
