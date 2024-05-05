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
import PermissionFilter from '../../components/salas/PermissionFilter';
import { Room } from '../../types/RoomTypes';
import axios from 'axios';
import RoomTable from '../../components/salas/RoomPage';
import RoomCRUD from '../../components/salas/RoomCRUD';

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

const HomePageAdminRooms: React.FC = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [salaEditada, setSalaEditada] = useState(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>(`${API_URL}/sala`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = async (text: string) => {
    // Implemente a lógica de pesquisa aqui
  };

  const handleTipoChange = (novoTipo: string) => {
    // Implemente a lógica de filtragem por tipo aqui
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await axios.delete(`${API_URL}/sala/${roomId}`);
      // Atualizar o estado local removendo a sala excluída
      setRooms(prevRooms => prevRooms.filter(room => room.id_sala !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleEditPermission = async (roomId: number) => {
    // Implemente a lógica de edição de permissões aqui
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack flexDirection="row" sx={{ width: '100%' }}>
        <Stack height="100vh" flexDirection="row" marginRight={1}>
          <NavBar />
          <Divider orientation="vertical" />
        </Stack>
        <Divider />
        <Stack width="100%">
          <Stack flexDirection="row" height={40} padding={1} margin="1rem 3rem 1rem 0rem" justifyContent="space-between" width="auto">
            <NovoEventoButton onClick={() => setModalOpen(true)} />
            <SearchButton onSearch={handleSearch} />
            <PrintButton />
            <ProfileActions />
          </Stack>
          <Stack marginTop={3}>
            <Stack flexDirection={'row'} justifyContent={'end'} marginRight={3}>
              <Stack width={'20rem'}>
                <PermissionFilter permissionSelected={tipoSelecionado} onPermissionChange={handleTipoChange} />
              </Stack>
            </Stack>
            <Stack>
              <RoomTable
                rooms={rooms}
                setRooms={setRooms}
                onDeleteRoom={handleDeleteRoom}
                onEditPermission={handleEditPermission}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <RoomCRUD
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sala={salaEditada}
        adicionarSala={novaSala => setRooms([...rooms, novaSala])}
        atualizarSala={(id, salaAtualizada) => setRooms(rooms.map(sala => (sala.id === id ? salaAtualizada : sala)))}
        removerSala={id => setRooms(rooms.filter(sala => sala.id !== id))}
      />
    </ThemeProvider>
  );
};

export default HomePageAdminRooms;
