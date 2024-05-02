import axios from 'axios';
import { Credentials } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // Rota da API

interface LoginResponse {
  id: number;
  login: boolean;
  username: string;
  email: string;
  admin: number;
  role: string;
}

export const authenticateUser = async ({ email, password }: Credentials): Promise<{ loggedId: number, loggedIn: boolean, isAdmin: boolean }> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });

    /* console.log('Resposta da requisição para o backend - ', response.data); */

    const {id, login, admin } = response.data;
    const loggedIn = login;
    const loggedId = id;
    const isAdmin = admin === 1;

    return { loggedId, loggedIn, isAdmin };
  } catch (error) {
    console.error('Falha de autenticação do usuário:', error);
    throw new Error('Falha de autenticação');
  }
};
