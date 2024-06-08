import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  Stack,
  Divider,
  CircularProgress,
  Typography,
  createTheme,
} from '@mui/material';
import NovoEventoButton from '../../components/botoes/btnNovoEvento';
import SelecionarPeriodo from '../../components/botoes/btnDia';
import SearchButton from '../../components/botoes/btnSearch';
import PrintButton from '../../components/botoes/btnPrint';
import ProfileActions from '../../components/perfil/profileActions';
import NavBar from '../../components/navBar/navBar';
import DateInput from '../../components/calendar/CalendarComponent';
import VisualizacaoDiaria from '../../components/meeting/ListMettingDay';
import TypeMeeting from '../../components/meeting/TypeMetting';
import VisualizacaoSemanal from '../../components/meeting/ListMettingWeek';
import VisualizacaoMensal from '../../components/meeting/ListMettingMonth';

// Importar todas as interfaces
import { User, UserStatus } from '../../types/userTypes';
import { Credentials } from '../../types/userTypes';
import { Meeting } from '../../types/MeetingTypes';
import { SalaPresencial } from '../../types/roomPresencialTypes';
import { SalaOnline } from '../../types/roomOnlineTypes';
import { Anexo } from '../../types/AnexoTypes';
import { Observacao } from '../../types/ObservacaoTypes';
import { ParticipanteReuniao } from '../../types/ParticipanteReuniaoTypes';
import { NotificacaoReuniao } from '../../types/NotificacaoReuniaoTypes';

import VisualizacaoAll from '../../components/meeting/ListMettingAll';
import BtnSIATT from '../../components/botoes/btnSIATTLogo';
import CrudReuniao from '../../components/meeting/crudMeeting/MeetingCRUD';
import { useUser } from '../../contexts/UserContext';

interface dataHomePageUser {
  name: string;
  userLogged: UserStatus;
}
axios.defaults.withCredentials = true;

const HomePageUser: React.FC<dataHomePageUser> = () => {
  // INTEGRAÇÃO SISTEMA REUNIÃO COM DB
  const [users, setUsers] = useState<User[]>([]);
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const [startMeetings, setStartMeetings] = useState<Meeting[]>([]);
  const [meetingEdit, setMeetingEdit] = useState<Meeting | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [salasPresenciais, setSalasPresenciais] = useState<SalaPresencial[]>([]);
  const [salasOnline, setSalasOnline] = useState<SalaOnline[]>([]);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [participantesReuniao, setParticipantesReuniao] = useState<ParticipanteReuniao[]>([]);
  const [notificacoesReuniao, setNotificacoesReuniao] = useState<NotificacaoReuniao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userStatus } = useUser();

  // ESTADOS DO COMPONENTE
  const [modalOpen, setModalOpen] = useState(false); // MANIPULACAO MODAL
  const [date, setDate] = useState<Date>(new Date());
  const [tipoSelecionado, setTipoSelecionado] = useState('todos'); // ESTADO PARA TIPO DE REUNIAO
  const [periodo, setPeriodo] = useState<'Dia' | 'Semana' | 'Mes' | 'Todos'>('Todos'); // ESTADO PARA PERIODO

  // Theme
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

  // Carregamento dos dados do backend
  useEffect(() => {
    const fetchData = async () => {
      console.log(userStatus?.id)
      try {
        const [
          usersResponse,
          meetingsResponse,
          salasPresenciaisResponse,
          salasOnlineResponse,
          anexosResponse,
          observacoesResponse,
          participantesReuniaoResponse,
          notificacoesReuniaoResponse,
        ] = await Promise.all([
          axios.get('http://localhost:3000/us'),
          /* axios.get(`http://localhost:3000/reuniao1`), */
          axios.get(`http://localhost:3000/reuniao1/usuario/${userStatus.id}`),
          axios.get('http://localhost:3000/salapresencial'),
          axios.get('http://localhost:3000/salaonline'),
          axios.get('http://localhost:3000/anexo'),
          axios.get('http://localhost:3000/observacao'),
          axios.get('http://localhost:3000/participante'),
          axios.get('http://localhost:3000/notificacao'),
        ]);

        // Simulando atraso para teste do loading
        setTimeout(() => {
          setUsers(usersResponse.data);
          setMeetings(meetingsResponse.data);
          setStartMeetings(meetingsResponse.data);
          setSalasPresenciais(salasPresenciaisResponse.data);
          setSalasOnline(salasOnlineResponse.data);
          setAnexos(anexosResponse.data);
          setObservacoes(observacoesResponse.data);
          setParticipantesReuniao(participantesReuniaoResponse.data);
          setNotificacoesReuniao(notificacoesReuniaoResponse.data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para checkar os dados dos cookies de sessão do usuário
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/ck')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.username);
          setSelectedRole(res.data.admin);

          if (res.data.admin == "1") {
            navigate('/admin');
          }
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // CRUD Reuniões
  const adicionarReuniao = (novaReuniao: Meeting) => {
    setMeetings((reunioesAnteriores) => [...reunioesAnteriores, novaReuniao]);
  };

  const atualizarReuniao = (id: number, reuniaoAtualizada: Meeting) => {
    setMeetings((reunioesAnteriores) =>
      reunioesAnteriores.map((reuniao) =>
        reuniao.id_reuniao === id ? { ...reuniao, ...reuniaoAtualizada } : reuniao
      )
    );
  };

  const atualizarReuniao1 = (reuniaoAtualizada: Meeting) => {
    setMeetings((reunioesAnteriores) =>
      reunioesAnteriores.map((reuniao) =>
        reuniao.id_reuniao === reuniaoAtualizada.id_reuniao ? { ...reuniao, ...reuniaoAtualizada } : reuniao
      )
    );
  };

  const removerReuniao = (id: number) => {
    setMeetings((reunioesAnteriores) =>
      reunioesAnteriores.filter((reuniao) => reuniao.id_reuniao !== id)
    );
  };

  // Função para lidar com a mudança de período
  const handlePeriodChange = (newPeriodo: 'Dia' | 'Semana' | 'Mes' | 'Todos') => {
    setPeriodo(newPeriodo);
  };

  // Função para lidar com a mudança de data
  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  // Função para lidar com o clique no botão novo evento
  const handleNovoEventoClick = () => {
    setMeetingEdit(null); // Iniciar uma nova reunião
    setModalOpen(true); // Abre o modal
  };

  // Função para lidar com a edição de uma reunião
  const handleEditarReuniaoClick = (reuniao: Meeting) => {
    setMeetingEdit(reuniao); // Define a reunião para edição
    setModalOpen(true); // Abre o modal
  };

  const handleModalClose = () => {
    setModalOpen(false); // Fecha o modal
    setMeetingEdit(null); // Reseta a reunião em edição
  };

  // Função para lidar com a pesquisa
  const handleSearch = (text: string) => {
    if (text.trim() === '') {
      setMeetings(startMeetings);
    } else {
      const reunioesFiltradas = meetings.filter(meeting => {
        return (
          meeting.titulo.toLowerCase().includes(text.toLowerCase()) ||
          meeting.descricao.toLowerCase().includes(text.toLowerCase()) ||
          meeting.tipo.toLowerCase().includes(text.toLowerCase()) ||
          meeting.data_inicio.toString().toLowerCase().includes(text.toLowerCase()) ||
          meeting.data_final.toString().toLowerCase().includes(text.toLowerCase())
        );
      });
      setMeetings(reunioesFiltradas);
    }
  };

  // Função para lidar com a mudança de tipo selecionado
  const handleTipoChange = (novoTipo: string) => {
    let reunioesParaFiltrar = startMeetings;
    if (novoTipo !== 'todos') {
      reunioesParaFiltrar = startMeetings.filter((meeting) => meeting.tipo.toUpperCase() === novoTipo.toUpperCase());
    }
    setMeetings(reunioesParaFiltrar);
    setTipoSelecionado(novoTipo);
  };

  // Renderização condicional
  const styleDay = {
    display: periodo === 'Dia' ? 'block' : 'none',
  };

  const styleWeek = {
    display: periodo === 'Semana' ? 'block' : 'none',
  };

  const styleMonth = {
    display: periodo === 'Mes' ? 'block' : 'none',
  };

  const styleAll = {
    display: periodo === 'Todos' ? 'block' : 'none',
  };

  // Renderização do componente
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </div>
    );
  }

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
            <NovoEventoButton title='Novo Evento' onClick={handleNovoEventoClick} />
            <SelecionarPeriodo onPeriodoChange={handlePeriodChange} />
            <SearchButton onSearch={handleSearch} />
            <PrintButton />
            <ProfileActions />
          </Stack>

          <Divider />

          <Stack marginTop={3}>
            <Stack flexDirection={'row'} justifyContent={'space-between'} marginRight={3}>
              <Stack width="auto" margin={1}>
                <DateInput onDateChange={handleDateChange} initialDate={date} />
              </Stack>

              <Stack width={'20rem'}>
                <TypeMeeting onTipoChange={handleTipoChange} tipoSelecionado={tipoSelecionado} />
              </Stack>
            </Stack>

            <Stack>
              <div>
                <div style={styleDay}>
                  <VisualizacaoDiaria
                    dataSelecionada={date}
                    reunioes={meetings}
                    onSelectReuniao={handleEditarReuniaoClick}
                  />
                </div>

                <div style={styleWeek}>
                  <VisualizacaoSemanal
                    dataSelecionada={date}
                    reunioes={meetings}
                    onSelectReuniao={handleEditarReuniaoClick}
                  />
                </div>

                <div style={styleMonth}>
                  <VisualizacaoMensal
                    dataSelecionada={date}
                    reunioes={meetings}
                    onSelectReuniao={handleEditarReuniaoClick}
                  />
                </div>

                <div style={styleAll}>
                  <VisualizacaoAll
                    reunioes={meetings}
                    onSelectReuniao={handleEditarReuniaoClick}
                  />
                </div>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <CrudReuniao
        open={modalOpen}
        onClose={handleModalClose}
        users={users}
        reuniao={meetingEdit}
        reunioes={meetings}
        adicionarReuniao={adicionarReuniao}
        removerReuniao={removerReuniao}
        atualizarReuniao={atualizarReuniao1}
        salasOnline={salasOnline}
        salasPresenciais={salasPresenciais}
      />
    </ThemeProvider>
  );
};

export default HomePageUser;
