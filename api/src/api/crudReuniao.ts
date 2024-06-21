import axios from 'axios';

const BASE_URL = 'http://localhost:3000/reuniao1';

export interface Meeting {
  id_reuniao: number;
  titulo: string;
  descricao: string; 
  data_inicio: Date;
  data_final: Date;
  duracao: number;
  tipo: 'Presencial' | 'Hibrido' | 'Online';
  sala_presencial_id: number;
  sala_online_id: number; 
  organizador_id: number;
}

export interface User {
  id_usuario: number;
  nome: string;
}

//======================= FORMAT DATE TO SQL FORMAT =======================//
const formatDateToSQL = (date: Date): string => {
  const pad = (n: number) => (n < 10 ? '0' : '') + n;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
//----------------------------------------------------------------------------//

//============================== GET REUNIOES ==================================//
export const getReunioes = async (): Promise<Meeting[]> => {
  try {
    console.log('Chamando getReunioes');
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar reuniões:', error);
    throw error;
  }
};
//----------------------------------------------------------------------------//

//============================ GET BY ID ==================================//
export const getReuniaoById = async (id: number): Promise<Meeting> => {
  try {
    console.log(`Chamando getReuniaoById com id: ${id}`);
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar reunião com ID ${id}:`, error);
    throw error;
  }
};
//----------------------------------------------------------------------------//

// ==================================== CREATE REUNIAO ==================================== //
export const createReuniao = async (meeting: Meeting, participantes: User[]): Promise<number> => {
  try {
    console.log('id_reuniao ', meeting.id_reuniao);
    console.log('meeting.data_inicio :', meeting.data_inicio);
    console.log('meeting.data_final', meeting.data_final);
    console.log('meeting.duracao', meeting.duracao);
    console.log('meeting.titulo', meeting.titulo);
    console.log('meeting.tipo', meeting.tipo);
    console.log('meeting.descricao', meeting.descricao);
    console.log('meeting.organizador_id', meeting.organizador_id);
    console.log('meeting.sala_presencial_id', meeting.sala_presencial_id);
    console.log('meeting.sala_online_id', meeting.sala_online_id);

    const formattedMeeting = {
      ...meeting,
      data_inicio: formatDateToSQL(meeting.data_inicio),
      data_final: formatDateToSQL(meeting.data_final),
      id_reuniao: null,
      sala_online_id: null
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/zoom/meetings",
        {
          topic: meeting.titulo,
          start_time: formattedMeeting.data_inicio,
          duration: meeting.duracao,
          agenda: meeting.descricao, // Renomeado para corresponder ao backend
        }
      );

      const meetingurl = response.data.meeting;
      if (meetingurl) {
        const joinUrl = meetingurl.join_url;
        console.log(`
        =================================================
        ${joinUrl}
        =================================================
        `);
        alert(`Reunião criada com sucesso! \n Link da reunião: ${joinUrl}`);
        window.open(joinUrl);
      } else {
        throw new Error("Nenhuma reunião encontrada na resposta");
      }
    } catch (error) {
      console.error("Erro ao criar reunião:", error);
      alert(`Erro ao criar reunião: ${error}`);
    }

    const response = await axios.post(BASE_URL, formattedMeeting);
    const insertId = response.data.insertId;


    // ADD PARTICIPANTES
    await Promise.all(participantes.map(async (usuario) => {
      await axios.post('http://localhost:3000/participante', {
        usuario_id: usuario.id_usuario,
        reuniao_id: insertId
      });
    
      }));
    alert("Reunião Criada com Sucesso!")  

    return insertId;
  } catch (error) {
    console.error('Erro ao criar reunião:', error);
    throw error;
  }
};
//----------------------------------------------------------------------------//

// ========================== UPDATE DA REUNIAO ============================ //
export const updateReuniao = async (id: number, meeting: Partial<Meeting>, participantes: User[]): Promise<Meeting> => {
  try {
    console.log(`Chamando updateReuniao com id: ${id} e meeting:`, meeting);

    const formattedMeeting = {
      ...meeting,
      data_inicio: meeting.data_inicio ? formatDateToSQL(new Date(meeting.data_inicio)) : undefined,
      data_final: meeting.data_final ? formatDateToSQL(new Date(meeting.data_final)) : undefined,
    };

    const response = await axios.put(`${BASE_URL}/${id}`, formattedMeeting);

    // Atualiza os participantes após a atualização da reunião
    const currentParticipants = await axios.get(`http://localhost:3000/participante?reuniao_id=${id}`);
    const currentParticipantIds = currentParticipants.data.map((p: any) => p.usuario_id);
    const newParticipantIds = participantes.map(u => u.id_usuario);

    const participantsToRemove = currentParticipants.data.filter((p: any) => !newParticipantIds.includes(p.usuario_id));
    for (const participant of participantsToRemove) {
      await axios.delete(`http://localhost:3000/participante/${participant.id_participante}`);
    }

    const participantsToAdd = newParticipantIds.filter(id => !currentParticipantIds.includes(id));
    for (const usuario_id of participantsToAdd) {
      await axios.post('http://localhost:3000/participante', {
        usuario_id,
        reuniao_id: id
      });
    }

    alert("Reunião Atualizada com Sucesso!") 
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar reunião com ID ${id}:`, error);
    throw error;
  }
};
//----------------------------------------------------------------------------//

//========================== DELETE REUNIAO ==============================//
export const deleteReuniao = async (id: number): Promise<void> => {
  try {
    console.log(`Chamando deleteReuniao com id: ${id}`);
    // Primeiro, remove os participantes da reunião
    const currentParticipants = await axios.get(`http://localhost:3000/participante?reuniao_id=${id}`);
    for (const participant of currentParticipants.data) {
      await axios.delete(`http://localhost:3000/participante/${participant.id_participante}`);
    }



    
    // Depois, remove a reunião
    await axios.delete(`${BASE_URL}/${id}`);
    alert("Reunião Deletada com Sucesso!") 
  } catch (error) {
    console.error(`Erro ao deletar reunião com ID ${id}:`, error);
    throw error;
  }
};
//----------------------------------------------------------------------------//