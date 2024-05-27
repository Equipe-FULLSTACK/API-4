import axios from 'axios';
import { Credentials } from '../types/userTypes';
import { UserStatus } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // Rota da API
interface LoginResponse {
  id: number;
  login: boolean;
  username: string;
  email: string;
  admin: number;
  role: string;
}

export let eadmin: boolean = localStorage.getItem('eadmin') === 'true';

export const authenticateUser = async ({ email, password }: Credentials, setUserStatus: (status: UserStatus | null) => void): Promise<{ loggedId: number, loggedIn: boolean, isAdmin: boolean }> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });

    /* console.log('Resposta da requisição pa9ra o backend - ', response.data); */

    const {id, login, admin } = response.data;
    const loggedIn = login;
    const loggedId = id;
    const isAdmin = admin === 1;

    // ATUALIZA CONTEXTO
    setUserStatus({
      id: response.data.id,
      valid: response.data.login,
      username: response.data.username,
      admin: response.data.admin === 1,
      role: response.data.role
    });

    if (isAdmin && !eadmin) {
      eadmin = true;
      localStorage.setItem('eadmin', 'true'); // Salva o valor no local storage
    } else if (!isAdmin && eadmin) {
      eadmin = false;
      localStorage.setItem('eadmin', 'false'); // Salva o valor no local storage
    }
    console.log('Usuário é administrador:', admin);

    return { loggedId, loggedIn, isAdmin };
  } catch (error) {
    console.error('Falha de autenticação do usuário:', error);
    throw new Error('Falha de autenticação');
  }
};