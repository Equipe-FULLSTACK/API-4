// auth.ts

import axios from 'axios';
import { User, Credentials } from '../types/userTypes';

const API_URL = 'http://localhost:3000'; // endereço rota api

export const authenticateUser = async ({ email, password }: Credentials): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/us`); // para user usar us

    const user = response.data.find(user => user.email_usuario === email && user.senha_usuario === password);

    return user || null;
  } catch (error) {
    console.error('Falha de autenticação usuário:', error);
    throw new Error('Falha de autenticação');
  }
};