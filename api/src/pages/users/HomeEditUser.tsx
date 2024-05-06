// HomePageAdminUser.tsx
import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  Stack,
  Divider,
} from '@mui/material';
import SearchButton from '../../components/botoes/btnSearch';
import PrintButton from '../../components/botoes/btnPrint';
import ProfileActions from '../../components/perfil/profileActions';
import NavBar from '../../components/navBar/navBar';
import UserPage from '../../components/user/UserPage';
import PermissionFilter from '../../components/user/PermissionFilter';
import { User } from '../../types/userTypes';
import axios from 'axios';
import BtnNewUser from '../../components/botoes/btnNewUser';
import UserCRUD from '../../components/modal/UserCRUD';
import BtnSIATT from '../../components/botoes/btnSIATTLogo';

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
  const [openUserCRUD, setOpenUserCRUD] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [render, setRender] = useState<boolean>(false);


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

  const handleEditDeleteUser = (user: User) => {
    console.log(user);
    setEditingUser(user);
    setOpenUserCRUD(true); // Corrigido aqui, sempre abre o UserCRUD ao editar/deletar um usuário
  }

  const handleAddUser = () => {
    setOpenUserCRUD(true);
  };

  const handleCloseUserCRUD = () => {
    setOpenUserCRUD(false);
    setEditingUser(undefined);
  };

  const handleSaveUser = (userData: User) => {
    console.log('Adicionando ou atualizando usuário:', userData);
    handleCloseUserCRUD();
  };

  const handleRemoveUser = (userId: number) => {
    console.log('Removendo usuário:', userId);
    handleCloseUserCRUD();
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
            <BtnSIATT />
            <SearchButton onSearch={handleSearch} />
            <PrintButton />
            <ProfileActions />
          </Stack>

          <Divider />

          <Stack marginTop={3}>

            <Stack flexDirection={'row'} justifyContent={'space-between'} marginRight={3} alignItems={'center'}>
              <BtnNewUser onClick={handleAddUser} />
              <Stack width={'20rem'}>
                <PermissionFilter permissionSelected={tipoSelecionado} onPermissionChange={handleTipoChange} />
              </Stack>
            </Stack>

            <Stack>
              <UserPage users={users} setUsers={setUsers} onDeleteUser={handleEditDeleteUser} onEditPermission={handleEditDeleteUser} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Modal para adicionar ou editar usuários */}
      <UserCRUD
        open={openUserCRUD}
        onClose={handleCloseUserCRUD}
        user={editingUser}
        onSave={handleSaveUser}
        onRemove={handleRemoveUser}
        onUpdateUser={handleSaveUser}
        onRemoveUser={handleRemoveUser}
      />
    </ThemeProvider>
  );
};

export default HomePageAdminUser;
