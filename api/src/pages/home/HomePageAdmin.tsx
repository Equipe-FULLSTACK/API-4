import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  Stack,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import ReuniaoModal from '../../components/meeting/MeetingCRUD';


import reunioesIniciais from '../../components/meeting/dbReunioes' /* SUBSTITUIR PELO API */
import VisualizacaoAll from '../../components/meeting/ListMettingAll';
import UserPage from '../../components/user/UserPage';
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

interface dataHomePage {
  name: string;
}


const HomePageAdmin: React.FC = () => {
  // Estado para armazenar o período selecionado (Dia, Semana ou Mes)
  const [periodo, setPeriodo] = useState<'Dia' | 'Semana' | 'Mes' | 'Todos'>('Todos');

  const [name, setName] = useState('')
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(() =>{
      axios.get('http://localhost:3000/ck')
      .then( res => {
          if(res.data.valid) {
              setName(res.data.username);
              setSelectedRole(res.data.role)
          } else {
              navigate('/')
          }
          /* console.log(res) */
      })
      .catch(err => console.log(err))
  },[])

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Manipulações CRUD Reuniões // 
  const [reunioes, setReunioes] = useState(reunioesIniciais);
  const [modalOpen, setModalOpen] = useState(false);
  const [reuniaoEditada, setReuniaoEditada] = useState(null);

  // Função para adicionar uma nova reunião
  const adicionarReuniao = (novaReuniao) => {
    setReunioes((reunioesAnteriores) => [...reunioesAnteriores, novaReuniao]);
  };

  // Função para ler as reuniões (no caso, retornamos o estado local)
  const lerReunioes = () => {
    return reunioes;
  };

  // Função para atualizar uma reunião existente
  const atualizarReuniao = (id, reuniaoAtualizada) => {
    setReunioes((reunioesAnteriores) =>
      reunioesAnteriores.map((reuniao) =>
        reuniao.id === id ? { ...reuniao, ...reuniaoAtualizada } : reuniao
      )
    );
  };

  // Função para remover uma reunião
  const removerReuniao = (id) => {
    setReunioes((reunioesAnteriores) =>
      reunioesAnteriores.filter((reuniao) => reuniao.id !== id)
    );
  };

  // Função para imprimir os dados no console
  useEffect(() => {
    /* console.log('Reuniões:', reunioes); */
  }, [reunioes]);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Estado para armazenar a data selecionada
  const [data, setData] = useState<string>(new Date().toISOString().slice(0, 10)); // Define data de hoje como padrão

  // Estado para armazenar o tipo selecionado
  const [tipoSelecionado, setTipoSelecionado] = useState('todos');

  // Função para lidar com a mudança de período
  const handlePeriodChange = (newPeriodo: 'Dia' | 'Semana' | 'Mes' | 'Todos') => {
    setPeriodo(newPeriodo);
    /* console.log(`Período selecionado: ${newPeriodo}`); */
  };


  // Função para lidar com a mudança de data
  const handleDateChange = (date: string) => {
    setData(date);
    /* console.log('Data selecionada:', date); */
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Função para lidar com a pesquisa
const handleSearch = (text: string) => {
  /* console.log(`Texto pesquisado: ${text}`);
 */
  // Verifica se o campo de pesquisa está ativo
  if (text.trim() === '') {
      // Se o texto estiver vazio, restaure o array original de reuniões
      setReunioes(reunioesIniciais);
  } else {
      // Filtrar reuniões com base no texto pesquisado
      const reunioesFiltradas = reunioes.filter(reuniao => {
          // Verifica se o texto pesquisado está presente em qualquer propriedade relevante da reunião
          return (
              reuniao.nome.toLowerCase().includes(text.toLowerCase()) ||
              reuniao.tipoReuniao.toLowerCase().includes(text.toLowerCase()) ||
              reuniao.data.toLowerCase().includes(text.toLowerCase()) ||
              reuniao.inicio.toLowerCase().includes(text.toLowerCase()) ||
              reuniao.termino.toLowerCase().includes(text.toLowerCase())
          );
      });

      // Atualize o estado com as reuniões filtradas
      setReunioes(reunioesFiltradas);
  }
};


  //////////////////////////////////FUNÇÕES SUPORTE PARA EDIÇÃO REUNIÃO E CRIAÇÃO//////////////////////////////

  // Função para lidar com o clique no botão novo evento
  const handleNovoEventoClick = () => {
    /* console.log('Teste BTN novo Evento!'); */
    setReuniaoEditada(null); // Inicia com uma reunião vazia para adicionar uma nova reunião
    setModalOpen(true); // Abre o modal
  };

  const handleEditarReuniaoClick = (reuniao) => {
    setReuniaoEditada(reuniao); // Define a reunião a ser editada
    setModalOpen(true); // Abre o modal
  };

  const handleModalClose = () => {
    setModalOpen(false); // Fecha o modal
  };

  // Método para editar uma reunião
  const handleEditarClick = (reuniao) => {
    handleEditarReuniaoClick(reuniao);
  };

  // Método para remover uma reunião
  const handleRemoverClick = (id) => {
    removerReuniao(id);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
// Função para lidar com a mudança de tipo selecionado
const handleTipoChange = (novoTipo: string) => {
  /* console.log(`Tipo selecionado: ${novoTipo}`); */

  // Sempre começamos com o array original de reuniões
  let reunioesParaFiltrar = reunioesIniciais;

  // Verifica se o tipo selecionado é diferente de "todos"
  if (novoTipo !== 'todos') {
      // Filtrar reuniões com base no tipo selecionado
      reunioesParaFiltrar = reunioesIniciais.filter(reuniao => reuniao.tipoReuniao === novoTipo);
  }

  // Atualiza o estado com as reuniões filtradas (ou o array original se o tipo for "todos")
  setReunioes(reunioesParaFiltrar);

  // Atualiza o estado do tipo selecionado
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


  return (
    <ThemeProvider theme={darkTheme}>
      <Stack flexDirection="row" sx={{ width: '100%' }}>
        <Stack height="100vh" flexDirection="row" marginRight={1}>
          <NavBar />
          <Divider orientation="vertical" />
        </Stack>

        <Stack width="100%">
          <Stack flexDirection="row" height={40} padding={1} margin="1rem 3rem 1rem 0rem" justifyContent="space-between" width="auto">
            <BtnSIATT/>
            <NovoEventoButton onClick={handleNovoEventoClick} />
            <SelecionarPeriodo onPeriodoChange={handlePeriodChange} />
            <SearchButton onSearch={handleSearch} />
            <PrintButton />
            <ProfileActions />
          </Stack>

          <Divider />

          <Stack marginTop={3}>
            <Stack flexDirection={'row'} justifyContent={'space-between'} marginRight={3}>
              <Stack width="auto" margin={1}>
                <DateInput onDateChange={handleDateChange} formatDate={periodo} data={data} />
              </Stack>

              <Stack width={'20rem'}>
                <TypeMeeting onTipoChange={handleTipoChange} tipoSelecionado={tipoSelecionado} />
              </Stack>
            </Stack>


            <Stack>

            <Stack sx={{display:'flex'}}> {/* APAGAR DEPOIS */}
              <div>
                {/* Visualização diária */}
                <div style={styleDay}>
                  <VisualizacaoDiaria
                    dataSelecionada={data}
                    tipoSelecionado={tipoSelecionado}
                    reunioes={reunioes}
                    onEditarClick={handleEditarClick}
                    onRemoverClick={handleRemoverClick}
                  />
                </div>

                {/* Visualização semanal */}
                <div style={styleWeek}>
                  <VisualizacaoSemanal
                    dataSelecionada={data}
                    tipoSelecionado={tipoSelecionado}
                    reunioes={reunioes}
                    onEditarClick={handleEditarClick}
                    onRemoverClick={handleRemoverClick}
                  />
                </div>

                {/* Visualização mensal */}
                <div style={styleMonth}>
                  <VisualizacaoMensal
                    dataSelecionada={data}
                    tipoSelecionado={tipoSelecionado}
                    reunioes={reunioes}
                    onEditarClick={handleEditarClick}
                    onRemoverClick={handleRemoverClick}
                  />
                </div>
                
                {/* Visualização mensal */}
                <div style={styleAll}>
                  <VisualizacaoAll
                    dataSelecionada={data}
                    tipoSelecionado={tipoSelecionado}
                    reunioes={reunioes}
                    onEditarClick={handleEditarClick}
                    onRemoverClick={handleRemoverClick}
                  />
                </div>

              </div>
            </Stack>


            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <ReuniaoModal
        open={modalOpen}
        onClose={handleModalClose}
        reuniao={reuniaoEditada}
        adicionarReuniao={adicionarReuniao}
        atualizarReuniao={atualizarReuniao}
        removerReuniao={removerReuniao}
      />
    </ThemeProvider>
  );
};

export default HomePageAdmin;
