import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  userId: number;
  isAdmin: boolean;
}

interface CookieCheckerProps {
  onUserData: (userData: UserData) => void;
}

const CookieChecker: React.FC<CookieCheckerProps> = ({ onUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await axios.get<{ valid: boolean; userId: number; isAdmin: boolean }>('http://localhost:3000/ck', { withCredentials: true });
        if (response.data.valid) {
          // COOKIE VALIDO ENVIA DADO AO SOLICITANTE.
          const userData: UserData = {
            userId: response.data.userId,
            isAdmin: response.data.isAdmin
          };
          onUserData(userData);
        } else {
          // RETORNA LOGIN CASO DE ERRO
          navigate('/');
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    checkCookie();
  }, [onUserData, navigate]);

  return null; // PODEMOS COLOCAR UMA PÁGINA DE ERRO AQUI 
};

export default CookieChecker;
