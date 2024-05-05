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
    console.log(`Texto pesquisado: ${text}`);
    try {
      if (text.trim() === '') {
        const response = await axios.get<Room[]>(`${API_URL}/salas`);
        setRooms(response.data);
      } else {
        const filteredrooms = rooms.filter(room =>
          room.nome_sala.toLowerCase().includes(text.toLowerCase()) ||
          room.tipo_sala.toLowerCase().includes(text.toLowerCase()) ||
          room.permissao_sala.toLowerCase().includes(text.toLowerCase())
        );
        setRooms(filteredrooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };



  const handleTipoChange = (novoTipo: string) => {
    console.log(`Tipo selecionado: ${novoTipo}`);
    setTipoSelecionado(novoTipo);
    if (novoTipo === 'todos') {
      axios.get<Room[]>(`${API_URL}/salas`)
        .then(response => {
          setRooms(response.data);
        })
        .catch(error => {
          console.error('Error fetching rooms:', error);
        });
    } else {
      const filtered = rooms.filter(room => room.permissao_sala === novoTipo);
      setRooms(filtered);
    }
  };

 //////////////////////////////////FUNÇÕES SUPORTE PARA EDIÇÃO REUNIÃO E CRIAÇÃO//////////////////////////////
  // Função para lidar com o clique no botão novo evento
  const handleNovoEventoClick = () => {
    console.log('Teste BTN novo Evento!');
    setSalaEditada(null); // Inicia com uma sala vazia para adicionar uma nova reunião
    setModalOpen(true); // Abre o modal
};
const handleEditarSalaClick = (sala) => {
    setSalaEditada(sala); // Define a sala a ser editada
    setModalOpen(true); // Abre o modal
};

const handleModalClose = () => {
    setModalOpen(false); // Fecha o modal
};

// Método para editar uma sala
const handleEditarClick = (sala) => {
    handleEditarSalaClick(sala);
};

  // Método para remover uma reunião
  const handleRemoverClick = (id) => {
    removerSala(id);
  };


////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Manipulações CRUD Reuniões // 
const [rooms, setRooms] = useState<Room[]>([]); 


    // Função para adicionar uma nova reunião
    const adicionarSala = (novaSala) => {
        setRooms((salasAnteriores) => [...salasAnteriores, novaSala]);
      };

  // Função para atualizar uma reunião existente
  const atualizarSala = (id, salaAtualizada) => {
    setRooms((salasAnteriores) =>
      salasAnteriores.map((sala) =>
        id.sala === id ? { ...sala, ...salaAtualizada } : sala
      )
    );
  };

  // Função para imprimir os dados no console
  useEffect(() => {
    console.log('Reuniões:', rooms);
  }, [rooms]);



  // Função para remover uma sala
  const removerSala = (id) => {
    setRooms((reunioesAnteriores) =>
      reunioesAnteriores.filter((sala) => sala.id !== id)
    );
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
            <NovoEventoButton onClick={handleNovoEventoClick} />
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
              <RoomTable rooms={rooms} setRooms={setRooms} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <RoomCRUD
        open={modalOpen}
        onClose={handleModalClose}
        sala={salaEditada}
        adicionarSala={adicionarSala}
        atualizarSala={atualizarSala}
        removerSala={removerSala}
       />
    </ThemeProvider>
  );
};

export default HomePageAdminRooms;
