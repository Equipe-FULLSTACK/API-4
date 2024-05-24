import axios from 'axios';
import { Credentials, UserStatus } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // Rota da API

interface LoginResponse {
  id: number;
  login: boolean;
  username: string;
  email: string;
  admin: number;
  role: string;
}

export const authenticateUser = async ({ email, password }: Credentials, setUserStatus: (status: UserStatus | null) => void): Promise<{ loggedId: number, loggedIn: boolean, isAdmin: boolean }> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
    
    // ATUALIZA CONTEXTO
    setUserStatus({
      id: response.data.id,
      valid: response.data.login,
      username: response.data.username,
      admin: response.data.admin === 1,
      role: response.data.role
    });

    console.log('UserStatus atualizado:', response.data);

    const {id, login, admin } = response.data;
    const loggedIn = login;
    const loggedId = id;
    const isAdmin = admin === 1;

    return { loggedId, loggedIn, isAdmin};
  } catch (error) {
    console.error('Falha de autenticação do usuário:', error);
    throw new Error('Falha de autenticação');
  }
};
