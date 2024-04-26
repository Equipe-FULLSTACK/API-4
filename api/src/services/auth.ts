import axios from 'axios';
import { User, Credentials } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // Rota API

export const authenticateUser = async ({ email, password }: Credentials): Promise<{ user: User | null, loggedIn: boolean, isAdmin: boolean }> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/us`);

    const user = response.data.find(user => user.email_usuario === email && user.senha_usuario === password);

    const loggedIn = user !== undefined;
    const isAdmin = user?.admin_usuario === 1; // Verifica se o usuário é um administrador

    return { user, loggedIn, isAdmin };
  } catch (error) {
    console.error('Falha de autenticação do usuário:', error);
    throw new Error('Falha de autenticação');
  }
};
