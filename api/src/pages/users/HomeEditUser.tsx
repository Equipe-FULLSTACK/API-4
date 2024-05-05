import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  Stack,
  Divider,
} from '@mui/material';
import NovoEventoButton from '../../components/botoes/btnNovoEvento';
import SearchButton from '../../components/botoes/btnSearch';
import PrintButton from '../../components/botoes/btnPrint';
import ProfileActions from '../../components/perfil/profileActions';
import NavBar from '../../components/navBar/navBar';
import UserPage from '../../components/user/UserPage';
import PermissionFilter from '../../components/user/PermissionFilter';
import { User } from '../../types/userTypes';
import axios from 'axios';

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

const API_URL = 'http://localhost:3000';


const HomePageAdminUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [tipoSelecionado, setTipoSelecionado] = useState('todos');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/us`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (text: string) => {
    console.log(`Texto pesquisado: ${text}`);
    try {
      if (text.trim() === '') {
        const response = await axios.get<User[]>(`${API_URL}/us`);
        setUsers(response.data);
      } else {
        const filteredUsers = users.filter(user =>
          user.nome_usuario.toLowerCase().includes(text.toLowerCase()) ||
          user.email_usuario.toLowerCase().includes(text.toLowerCase()) ||
          user.permissao_usuario.toLowerCase().includes(text.toLowerCase())
        );
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleTipoChange = (novoTipo: string) => {
    console.log(`Tipo selecionado: ${novoTipo}`);
    setTipoSelecionado(novoTipo);
    if (novoTipo === 'todos') {
      axios.get<User[]>(`${API_URL}/us`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    } else {
      const filtered = users.filter(user => user.permissao_usuario === novoTipo);
      setUsers(filtered);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack flexDirection="row" sx={{ width: '100%' }}>
        <Stack height="100vh" flexDirection="row" marginRight={1}>
          <NavBar />
          <Divider orientation="vertical" />
        </Stack>

        <Stack width="100%">
          <Stack flexDirection="row" height={40} padding={1} margin="1rem 3rem 1rem 0rem" justifyContent="space-between" width="auto">
            <SearchButton onSearch={handleSearch} />
            <PrintButton />
            <ProfileActions/>
          </Stack>

          <Divider />

          <Stack marginTop={3}>
            <Stack flexDirection={'row'} justifyContent={'end'} marginRight={3}>
              <Stack width={'20rem'}>
                <PermissionFilter permissionSelected={tipoSelecionado} onPermissionChange={handleTipoChange} />
              </Stack>
            </Stack>

            <Stack>
              <UserPage users={users} setUsers={setUsers} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default HomePageAdminUser;
