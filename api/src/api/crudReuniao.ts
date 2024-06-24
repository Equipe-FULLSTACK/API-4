import axios from 'axios';

const BASE_URL = 'http://localhost:3000/reuniao1';

export interface Meeting {
  id_reuniao: number;
  meeting_id: string;
  titulo: string;
  descricao: string; 
  data_inicio: Date;
  data_final: Date;
  duracao: number;
  tipo: 'Presencial' | 'Hibrido' | 'Online';
  sala_presencial_id: number;
  sala_online_id: number; 
  organizador_id: number;
  link: string;
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
const formatDateToZoomFormat = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const seconds = ('0' + date.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

export const createReuniao = async (meeting: Meeting, participantes: User[]): Promise<number> => {
  try {
    // Formata as datas para o formato necessário pelo Zoom
    const formattedMeetingZoom = {
      ...meeting,
      data_inicio: formatDateToZoomFormat(meeting.data_inicio),
      data_final: formatDateToZoomFormat(meeting.data_final),
      id_reuniao: null,
      sala_online_id: null,
    };

    // Cria a reunião no Zoom
    const zoomResponse = await axios.post(
      "http://localhost:3000/zoom/meetings",
      {
        topic: meeting.titulo,
        start_time: formattedMeetingZoom.data_inicio,
        duration: meeting.duracao,
        agenda: meeting.descricao,
      }
    );

    const meetingurl = zoomResponse.data.meeting;
    if (meetingurl) {
      const joinUrl = meetingurl.join_url;
      console.log(`
      =================================================
      ${joinUrl}
      =================================================
      `);
    } else {
      throw new Error("Nenhuma reunião encontrada na resposta");
    }

    const formattedMeeting = {
      ...meeting,
      data_inicio: formatDateToSQL(meeting.data_inicio),
      data_final: formatDateToSQL(meeting.data_final),
      meeting_id: meetingurl.id,
      meeting_link: meetingurl.join_url
    };

    
    
    console.log(formattedMeeting);
    const response = await axios.post(BASE_URL, formattedMeeting);
    const insertId = response.data.insertId;

    // ADD PARTICIPANTES
    await Promise.all(participantes.map(async (usuario) => {
      await axios.post('http://localhost:3000/participante', {
        usuario_id: usuario.id_usuario,
        reuniao_id: insertId
      });
    }));
    
    alert("Reunião Criada com Sucesso!");

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
    // Formata as datas para o formato necessário pelo Zoom
    const formattedMeetingZoom = {
      ...meeting,
      data_inicio: formatDateToZoomFormat(meeting.data_inicio),
      data_final: formatDateToZoomFormat(meeting.data_final),
    };

    // Atualiza a reunião no Zoom
    const zoomResponse = await axios.put(
      `http://localhost:3000/zoom/meetings/${meeting.meeting_id}`,
      {
        topic: meeting.titulo,
        start_time: formattedMeetingZoom.data_inicio,
        duration: meeting.duracao,
        agenda: meeting.descricao,
      }
    );

    // Atualiza a reunião no banco de dados local
    const formattedMeeting = {
      ...meeting,
      data_inicio: formatDateToSQL(meeting.data_inicio),
      data_final: formatDateToSQL(meeting.data_final),
    };

    const response = await axios.put(`${BASE_URL}/${id}`, formattedMeeting);


    alert("Reunião Atualizada com Sucesso!");

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar reunião:', error);
    throw error;
  }
};
//----------------------------------------------------------------------------//

//========================== DELETE REUNIAO ==============================//
export const deleteReuniao = async (meeting_id: string, id: number): Promise<void> => {
  try {
    console.log(`Chamando deleteReuniao com meeting_id: ${meeting_id} e id: ${id}`);

    await axios.delete(`http://localhost:3000/zoom/meetings/${meeting_id}`);
    
    alert("Reunião Deletada com Sucesso!");
  } catch (error) {
    console.error(`Erro ao deletar reunião com Meeting_ID ${id}:`, error);
    throw error;
  }

  
  await axios.delete(`http://localhost:3000/reuniao1/${id}`);
};

//----------------------------------------------------------------------------//
