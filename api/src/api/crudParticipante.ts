import axios from 'axios';

const BASE_URL = 'http://localhost:3000/participante';

export interface Participante {
  id_participante: number;
  usuario_id: number;
  reuniao_id: number;
}

export const getParticipantesByReuniao = async (reuniaoId: number): Promise<Participante[]> => {
  try {
    console.log(`Chamando getParticipantesByReuniao com reuniaoId: ${reuniaoId}`);
    const response = await axios.get(`${BASE_URL}?reuniao_id=${reuniaoId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    throw error;
  }
};

export const addParticipante = async (participante: Participante): Promise<Participante> => {
  try {
    console.log('Chamando addParticipante com participante:', participante);
    const response = await axios.post(BASE_URL, participante);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar participante:', error);
    throw error;
  }
};

export const removeParticipante = async (id: number): Promise<void> => {
  try {
    console.log(`Chamando removeParticipante com id: ${id}`);
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao remover participante:', error);
    throw error;
  }
};
