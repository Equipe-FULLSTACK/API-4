import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from './DataTable';
import { Anexo } from '../types/AnexoTypes';
import { Meeting } from '../types/MeetingTypes';
import { NotificacaoReuniao } from '../types/NotificacaoReuniaoTypes';
import { Observacao } from '../types/ObservacaoTypes';
import { ParticipanteReuniao } from '../types/ParticipanteReuniaoTypes';
import { SalaOnline } from '../types/roomOnlineTypes';
import { SalaPresencial } from '../types/roomPresencialTypes';
import { User } from '../types/userTypes';

const TestComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [salasPresenciais, setSalasPresenciais] = useState<SalaPresencial[]>([]);
  const [salasOnline, setSalasOnline] = useState<SalaOnline[]>([]);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [participantesReuniao, setParticipantesReuniao] = useState<ParticipanteReuniao[]>([]);
  const [notificacoesReuniao, setNotificacoesReuniao] = useState<NotificacaoReuniao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          axios.get('http://localhost:3000/reuniao'),
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
          setSalasPresenciais(salasPresenciaisResponse.data);
          setSalasOnline(salasOnlineResponse.data);
          setAnexos(anexosResponse.data);
          setObservacoes(observacoesResponse.data);
          setParticipantesReuniao(participantesReuniaoResponse.data);
          setNotificacoesReuniao(notificacoesReuniaoResponse.data);
          setIsLoading(false); // Marcar dados como carregados
        }, 2000); // 2 Segundos
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

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
    <Container>
      <Typography variant="h4" gutterBottom>
        Dados Carregados
      </Typography>
      <DataTable title="Usuários" data={users} columns={['ID', 'Nome', 'Email']} keys={['id_usuario', 'nome_usuario', 'email_usuario']} />
      <DataTable title="Reuniões" data={meetings} columns={['ID', 'Título', 'Data Início', 'Data Fim']} keys={['id_reuniao', 'titulo', 'data_inicio', 'data_final']} />
      <DataTable title="Salas Presenciais" data={salasPresenciais} columns={['ID', 'Nome', 'Localização']} keys={['id_sala_presencial', 'nome', 'tamanho']} />
      <DataTable title="Salas Online" data={salasOnline} columns={['ID', 'Nome', 'URL']} keys={['id_sala_online', 'nome', 'link']} />
      <DataTable title="Anexos" data={anexos} columns={['ID', 'Nome', 'URL']} keys={['id_anexo', 'reuniao_id', 'anexo']} />
      <DataTable title="Observações" data={observacoes} columns={['ID', 'Conteúdo', 'Observacao']} keys={['id_observacao', 'reuniao_id', 'observacao']} />
      <DataTable title="Participantes" data={participantesReuniao} columns={['ID', 'usuario_id', 'reuniao_id']} keys={['id_participante', 'usuario_id', 'reuniao_id']} />
      <DataTable title="Notificações" data={notificacoesReuniao} columns={['ID', 'Mensagem', 'Lida']} keys={['id_notificacao', 'mensagem', 'lida']} />
    </Container>
  );
};

export default TestComponent;
