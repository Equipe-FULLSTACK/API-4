import axios from 'axios';
import { User, Credentials } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // Rota API

export const authenticateUser = async ({ email, password }: Credentials): Promise<{ user: User | null, loggedIn: boolean, isAdmin: boolean }> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }); // Passando os dados de email e senha no corpo da solicitação

    const { user, admin } = response.data;
    const loggedIn = !!user;
    const isAdmin = admin === 1; // Verifica se o usuário é um administrador

    return { user, loggedIn, isAdmin };
  } catch (error) {
    console.error('Falha de autenticação do usuário:', error);
    throw new Error('Falha de autenticação');
  }
};
