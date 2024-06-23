import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, FormControl, Typography } from '@mui/material';
import { getReunioes, createReuniao, updateReuniao, deleteReuniao } from '../../../api/crudReuniao';
import { getParticipantesByReuniao } from '../../../api/crudParticipante';
import { SalaOnline } from '../../../types/roomOnlineTypes';
import { SalaAvailable, SalaPresencial } from '../../../types/roomPresencialTypes';
import DateInput from './DateTimeInputField';
import TypeMeeting from '../TypeMetting';
import ModalPesquisaSalas from './selectRoom/ModalPesquisaSalas';
import SalaCard from './selectRoom/SalaCard';
import generateSalaAvailable from './selectRoom/salaAvailable';
import UserSelect from './userSelect/UserSelect';
import { User } from '../../../types/userTypes';
import { useUser } from '../../../contexts/UserContext';
import { Meeting } from '../../../types/MeetingTypes';

interface MeetingCRUDProps {
  open: boolean;
  onClose: () => void;
  reunioes: Meeting[];
  reuniao?: Meeting | null;
  users: User[];
  adicionarReuniao: (reuniao: Meeting) => void;
  atualizarReuniao: (reuniao: Meeting) => void;
  removerReuniao: (id: number) => void;
  salasPresenciais: SalaPresencial[];
  salasOnline: SalaOnline[];
}

const MeetingCRUD: React.FC<MeetingCRUDProps> = ({
  open,
  onClose,
  reuniao,
  reunioes,
  users,
  adicionarReuniao,
  atualizarReuniao,
  removerReuniao,
  salasPresenciais,
  salasOnline,
}) => {
  const initialFormData: Meeting = {
    id_reuniao: 0,
    meeting_id: '',
    meeting_link: '', // Certifique-se de adicionar este campo
    titulo: '',
    descricao: '',
    data_inicio: new Date(),
    data_final: new Date(),
    duracao: 60,
    tipo: 'Presencial',
    sala_presencial_id: 0,
    sala_online_id: 0,
    organizador_id: 1,
  };

  const [formData, setFormData] = useState<Meeting>(initialFormData);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState<SalaAvailable | null>(null);
  const [salaAvailable, setSalaAvailable] = useState<SalaAvailable[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<'Presencial' | 'Hibrido' | 'Online'>('Presencial');
  const { userStatus } = useUser();

  useEffect(() => {
    if (open) {
      if (reuniao) {
        setFormData(reuniao);
        fetchParticipantes(reuniao.id_reuniao);
        setTipoSelecionado(reuniao.tipo);
        if (reuniao.sala_presencial_id) {
          const selectedSala = salasPresenciais.find(sala => sala.id_sala_presencial === reuniao.sala_presencial_id);
          if (selectedSala) {
            setSalaSelecionada(selectedSala);
          }
        }
      } else {
        setFormData(initialFormData);
        setSelectedUsers([]);
        setSalaSelecionada(null);
      }
    }
  }, [open, reuniao, salasPresenciais]);

//=================================== SALAS DISPONIVEIS ===============================//
  useEffect(() => {
    const availableSalas = generateSalaAvailable(salasPresenciais, reunioes, formData.data_inicio, formData.data_final);
    setSalaAvailable(availableSalas);
  }, [salasPresenciais, reunioes, formData.data_inicio, formData.data_final]);
//--------------------------------------------------------------------------------------------//

//=================================== BUSCA PARTICIPANTES ===============================//
  const fetchParticipantes = async (reuniaoId: number) => {
    console.log('fetchParticipantes', reuniaoId);
    if (reuniaoId > 0) {
      try {
        console.log(`Fetching participants for meeting ID: ${reuniaoId}`);
        const participantes = await getParticipantesByReuniao(reuniaoId);
        const participantesUsers = participantes.map(p => users.find(u => u.id_usuario === p.usuario_id) as User);
        setSelectedUsers(participantesUsers);
      } catch (error) {
        console.error('Erro ao buscar participantes:', error);
      }
    }
  };
//--------------------------------------------------------------------------------------------//

//=================================== SALVA REUNIAO ===============================//
  const handleSave = async () => {
    try {
      console.log('Dados do formulário ao salvar:', formData);
  
      if (formData.id_reuniao) {
        const updatedMeeting = await updateReuniao(formData.id_reuniao, formData, selectedUsers);
        atualizarReuniao(updatedMeeting);
      } else {
        const insertId = await createReuniao(formData, selectedUsers);
        adicionarReuniao({ ...formData, id_reuniao: insertId });
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar reunião:', error);
    }
  };
//--------------------------------------------------------------------------------------------//

//=================================== REMOVE REUNIAO ===================================//
const handleRemove = async () => {
  try {
    if (formData.id_reuniao) {
      console.log(`Removing meeting with ID: ${formData.id_reuniao}`);
      await deleteReuniao(formData.meeting_id, formData.id_reuniao);
      removerReuniao(formData.id_reuniao);
      onClose();
    }
  } catch (error) {
    console.error('Erro ao remover reunião:', error);
  }
};
//--------------------------------------------------------------------------------------------//

//=================================== MUDA O VALOR DAS DATAS ===================================//
  const handleDateChange = (dataInicio: Date, dataFinal: Date, duracao: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      data_inicio: dataInicio,
      data_final: dataFinal,
      duracao: duracao,
    }));
  };

//=================================== SELECAO DE USUARIOS ===================================//
  const handleUserChange = (newSelectedUsers: User[]) => {
    setSelectedUsers(newSelectedUsers);
    setUserOrganizador();
    console.log('Usuários selecionados:', newSelectedUsers);
  };
//--------------------------------------------------------------------------------------------//

//=================================== FECHA MODAL ===================================//
  const handleModalClose = () => {
    setModalOpen(false);
  };
//--------------------------------------------------------------------------------------------//

//=================================== DESELECIONA SALA ===================================//
  const handleDeselectSala = () => {
    setSalaSelecionada(null); // DEIXA O VALOR DA SALA NULO
    setFormData((prevFormData) => ({
      ...prevFormData,
      sala_presencial_id: 0
    }));
  };
//--------------------------------------------------------------------------------------------//

//=================================== USUARIO QUE CRIOU A REUNIAO ===================================//
  const setUserOrganizador = () => {
    if (userStatus !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        organizador_id: userStatus.id
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        organizador_id: 1
      }));
    }
  };
//--------------------------------------------------------------------------------------------//

// =================================== SELECAO DE SALA ===================================//
  const onSalaSelect = (idSala: number) => {
    const selectedSala = salaAvailable.find(sala => sala.id_sala_presencial === idSala);
    if (selectedSala) {
      setSalaSelecionada(selectedSala);
      setFormData((prevFormData) => ({
        ...prevFormData,
        sala_presencial_id: idSala,
      }));
      setModalOpen(false);
    }
  };
//--------------------------------------------------------------------------------------------//

//=================================== SELECAO TIPO DE SALA ===================================//
  const handleTipoChange = (novoTipo: string) => {
    if (['Presencial', 'Hibrido', 'Online'].includes(novoTipo)) {
      setTipoSelecionado(novoTipo as 'Presencial' | 'Hibrido' | 'Online');
      setFormData((prevFormData) => ({
        ...prevFormData,
        tipo: novoTipo as 'Presencial' | 'Hibrido' | 'Online'
      }));
    }
  };
//--------------------------------------------------------------------------------------------//

//=================================== ACESSAR REUNIAO ===================================//
const acessarReuniao = async () => {
  try {
    window.open(formData.meeting_link, '_blank');
  } catch (error) {
    console.log('Erro ao acessar a reunião');
  }
};
//--------------------------------------------------------------------------------------------//

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          backgroundColor: '#2F2F2F',
          border: '1px solid #000',
          boxShadow: 24,
          padding: 4,
          zIndex: 1300,
        }}
      >
        <TextField
          label="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Descrição"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          fullWidth
          margin="normal"
        />

        <UserSelect users={users} onChange={handleUserChange} selectedUsers={selectedUsers} />

        <DateInput initialDate={formData.data_inicio} onDateChange={handleDateChange} />
        
        <FormControl fullWidth margin="normal">
          <TypeMeeting onTipoChange={handleTipoChange} tipoSelecionado={tipoSelecionado} />
        </FormControl>

        {tipoSelecionado === 'Presencial' || tipoSelecionado === 'Hibrido' ? (
          <FormControl fullWidth margin="normal">
            {salaSelecionada ? (
              <Box>
                <Typography>Sala Selecionada:</Typography>
                <SalaCard sala={salaSelecionada} onSelect={handleDeselectSala} selected={true} onDeselect={handleDeselectSala} />
              </Box>
            ) : (
              <Button variant="outlined" onClick={() => setModalOpen(true)}>
                Pesquisar
              </Button>
            )}
          </FormControl>
        ) : null}
        {tipoSelecionado === 'Online' || tipoSelecionado === 'Hibrido' ? (
          <FormControl fullWidth margin="normal">
            <Typography color={'gray'}>Sala ONLINE será gerada após envio da solicitação</Typography>
          </FormControl>
        ) : null}
        <Box display="flex" justifyContent="space-between" mt={3}>
          {formData.id_reuniao && (
            <Button variant="outlined" color="secondary" onClick={handleRemove}>
              Remover
            </Button>
          )}

          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
        {formData.meeting_link && (
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={acessarReuniao}>
              Acessar Reunião
            </Button>
          </Box>
        )}
        <ModalPesquisaSalas
          open={modalOpen}
          onClose={handleModalClose}
          reunioes={reunioes}
          salasPresenciais={salaAvailable}
          onSalaSelect={onSalaSelect}
          inicioDate={formData.data_inicio}
          terminoDate={formData.data_final}
        />
      </Box>
    </Modal>
  );
};

export default MeetingCRUD;
