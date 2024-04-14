
import React, { useState } from 'react';
import SIATTLogo from '../../assets/icons/siatt_logo.png'
import {
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  Stack,
  Link,
} from '@mui/material';


interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
    primary: {
      main: '#3f51b5', // Adjust primary color (optional)
    },
    secondary: {
      main: '#f50057', // Adjust secondary color (optional)
    },
  },
});

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="login-form">
        <Stack width={200} padding={1} margin={'auto'} marginBottom={3} marginTop={3}>
          <img src={SIATTLogo} alt="" />
        </Stack>
        <Stack marginBottom={3}>
          <Typography variant="h4">Bem vindo</Typography>
          <Typography variant="caption">
            Sistema de gestão e controle de reuniões e salas corporativas.
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
          />

          <Stack textAlign={'right'}>
          <Link href="#" underline='hover'>
            <Typography variant="body1" color="yellow">
                Esqueceu Senha?
            </Typography>
          </Link>
          </Stack>
          <Stack padding={0} marginTop={5}>
            <Button type="submit" variant="contained" color="primary" fullWidth size='large'>
              Entrar
            </Button>
          </Stack>

          <Stack marginTop={5}>
            <Typography variant="button" textAlign={'center'} alignItems={'center'}>
              Não possui acesso?  
            </Typography>

            <Typography variant="body1" textAlign={'center'} alignItems={'center'} color={'yellow'}>
              Solicite ao adminsitrador do sistema.
            </Typography>
          </Stack>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;