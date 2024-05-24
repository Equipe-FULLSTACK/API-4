// userTypes.ts

export interface User {
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    senha_usuario: string;
    diretoria_usuario: number;
    permissao_usuario: string;
    admin_usuario: number;
    userPhoto: string;
  }

  export interface Credentials {
    email: string;
    password: string;
  }

  export interface UserStatus {
    id: number;
    valid: boolean;
    username: string;
    admin: boolean;
    role: string;
}