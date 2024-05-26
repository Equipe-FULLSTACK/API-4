import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface para os dados do usuário
interface UserStatus {
    id: number;
    valid: boolean;
    username: string;
    admin: boolean;
    role: string;
}

// Interface para o contexto do usuário
interface UserContextType {
    userStatus: UserStatus | null;
    setUserStatus: (status: UserStatus | null) => void;
}

// Criar o contexto do usuário
const UserContext = createContext<UserContextType>({
    userStatus: null,
    setUserStatus: () => {}
});

// Componente provedor do contexto do usuário
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userStatus, setUserStatus] = useState<UserStatus | null>(() => {
        const storedUserStatus = localStorage.getItem('userStatus');
        return storedUserStatus ? JSON.parse(storedUserStatus) : null;
    });

    useEffect(() => {
        localStorage.setItem('userStatus', JSON.stringify(userStatus));
    }, [userStatus]);

    return (
        <UserContext.Provider value={{ userStatus, setUserStatus }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acessar o contexto do usuário
export const useUser = () => useContext(UserContext);

// Exportar o UserContext para uso em outros lugares
export { UserContext };
