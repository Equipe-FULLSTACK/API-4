import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme } from '@mui/material';

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
import VisualizacaoAll from '../../components/meeting/ListMettingAll';
import BtnSIATT from '../../components/botoes/btnSIATTLogo';
import CrudReuniao from '../../components/meeting/crudMeeting/MeetingCRUD';

import { User, UserStatus } from '../../types/userTypes';
import { Credentials } from '../../types/userTypes';
import { Meeting } from '../../types/MeetingTypes';
import { SalaPresencial } from '../../types/roomPresencialTypes';
import { SalaOnline } from '../../types/roomOnlineTypes';
import { Anexo } from '../../types/AnexoTypes';
import { Observacao } from '../../types/ObservacaoTypes';
import { ParticipanteReuniao } from '../../types/ParticipanteReuniaoTypes';
import { NotificacaoReuniao } from '../../types/NotificacaoReuniaoTypes';

import { useUser } from '../../contexts/UserContext';


interface dataHomePageUser {
  name: string;
  userLogged: UserStatus;
}
axios.defaults.withCredentials = true;
// Função principal para a HomePageUser
const HomePageAdmin: React.FC<dataHomePageUser> = () => {

  // INTEGRAÇÃO SISTEMA REUNIÃO COM DB
  const [users, setUsers] = useState<User[]>([]);
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const [startMeetings, setStartMeetings] = useState<Meeting[]>([]);
  const [meetingEdit, setMeetingEdit] = useState<Meeting>();
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

  const [tipoSelecionado, setTipoSelecionado] = useState('todos');  // ESTADO PARA TIPO DE REUNIAO
  const [periodo, setPeriodo] = useState<'Dia' | 'Semana' | 'Mes' | 'Todos'>('Todos'); // ESTADO PARA PERIODO


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// theme /////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////


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

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// CARREGAMENTO DOS DADOS BACKEND ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
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
          /* axios.get('http://localhost:3000/reuniao'), */
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
          setIsLoading(false); // SETA DADOS CARREGADOS
        }, 2000); // INSERIDO ATRASO PARA VER ANIMACAO LOADING
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////


  // Função para checkar os dados dos cookies de sessão do usuário
  const [name, setName] = useState('')
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/ck")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
          setSelectedRole(res.data.admin);

          if (res.data.admin != "1"){
            navigate("/user")
          }

        } else {
          navigate("/");
        }
        /* console.log(res) */
      })
      .catch((err) => console.log(err));
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CRUD REUNIOES ///////////////////////////////
  //////////////////////////////////////////////////////

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
////// DELETAR ////////
  const atualizarReuniao1 = (reuniaoAtualizada: Meeting) => {
    setMeetings((reunioesAnteriores) =>
      reunioesAnteriores.map((reuniao) =>
        reuniao.id_reuniao === reuniaoAtualizada.id_reuniao ? { ...reuniao, ...reuniaoAtualizada } : reuniao
      )
    );
  };
////// DELETAR ////////
  



  const removerReuniao = (id: number) => {
    setMeetings((reunioesAnteriores) =>
      reunioesAnteriores.filter((reuniao) => reuniao.id_reuniao !== id)
    );
  };

  //////////////////////////////////////////////////////
  //////// CRUD REUNIOES ///////////////////////////////
  //////////////////////////////////////////////////////



  // Função para imprimir os dados no console
  useEffect(() => {
    /* console.log('Reuniões:', meetings); */
  }, [meetings]);



  // Função para lidar com a mudança de período
  const handlePeriodChange = (newPeriodo: 'Dia' | 'Semana' | 'Mes' | 'Todos') => {
    setPeriodo(newPeriodo);
    /* console.log(`Período selecionado: ${newPeriodo}`); */
  };


  // Função para lidar com a mudança de data
  const handleDateChange = (date: Date) => {
    setDate(date);
    console.log('Data selecionada:', date);
  };


  // Função para lidar com o clique no botão novo evento
  const handleNovoEventoClick = () => {
    /* console.log('Teste BTN novo Evento!'); */
    setMeetingEdit([]); // 
    setModalOpen(true); //
  };

  const handleEditarReuniaoClick = (reuniao: Meeting) => {
    setMeetingEdit(reuniao); //DEFININDO REUNIÃO PARA EDIÇÃO
    setModalOpen(true); // Abre o modal
  };

  const handleModalClose = () => {
    setModalOpen(false); // Fecha o modal
  };

  // Método para editar uma reunião
  const handleEditarClick = (reuniao: Meeting) => {
    handleEditarReuniaoClick(reuniao);
  };

  // Método para remover uma reunião
  const handleRemoverClick = (id: number) => {
    removerReuniao(id);
  };



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para lidar com a pesquisa
  const handleSearch = (text: string) => {
    /* console.log(`Texto pesquisado: ${text}`); */


    if (text.trim() === '') {
      setMeetings(startMeetings);
    } else {
      const reunioesFiltradas = meetings.filter(meetings => {
        return (
          meetings.titulo.toLowerCase().includes(text.toLowerCase()) ||
          meetings.descricao.toLowerCase().includes(text.toLowerCase()) ||
          meetings.tipo.toLowerCase().includes(text.toLowerCase()) ||
          meetings.data_inicio.toString().toLowerCase().includes(text.toLowerCase()) ||
          meetings.data_final.toString().toLowerCase().includes(text.toLowerCase())
        );
      });
      setMeetings(reunioesFiltradas);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Função para lidar com a mudança de tipo selecionado
  const handleTipoChange = (novoTipo: string) => {
    /* console.log(`Tipo selecionado: ${novoTipo}`); */
    let reunioesParaFiltrar = startMeetings;
    if (novoTipo !== 'todos') {
      reunioesParaFiltrar = startMeetings.filter((meetings: { tipo: string; }) => meetings.tipo.toUpperCase() === novoTipo.toUpperCase());
    }
    setMeetings(reunioesParaFiltrar);
    setTipoSelecionado(novoTipo);
  };

  //////////////////////////////////RENDERIZALÇAO CONDICIONAL ////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// RENDERIZACAO DO COMPONENTE ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            {/* <NovoEventoButton onClick={handleNovoEventoClick} /> */}
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


            <Stack>{/* Renderiza visualizaçã condicional */}

              <div>
                {/* Visualização diária */}
                <div style={styleDay}>
                  <VisualizacaoDiaria
                    dataSelecionada={date}
                    reunioes={meetings}
                  />
                </div>

                {/* Visualização semanal */}
                <div style={styleWeek}>
                  <VisualizacaoSemanal
                    dataSelecionada={date}
                    reunioes={meetings}
                  />
                </div>

                {/* Visualização mensal */}
                <div style={styleMonth}>
                  <VisualizacaoMensal
                    dataSelecionada={date}
                    reunioes={meetings}
                  />
                </div>

                {/* Visualização mensal */}
                <div style={styleAll}>
                  <VisualizacaoAll
                    reunioes={meetings}
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
        reuniao={meetingEdit}
        reunioes={meetings}
        adicionarReuniao={adicionarReuniao}
        removerReuniao={removerReuniao}
        atualizarReuniao={atualizarReuniao1}
        salasOnline={salasOnline}
        salasPresenciais={salasPresenciais}
      >
      </CrudReuniao>
{/* 
      <ReuniaoModal
        open={modalOpen}
        onClose={handleModalClose}
        reuniao={meetingEdit}
        adicionarReuniao={adicionarReuniao}
        atualizarReuniao={atualizarReuniao}
        removerReuniao={removerReuniao}
      /> */}
    </ThemeProvider>
  );
};

export default HomePageAdmin;
