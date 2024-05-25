export interface Room {
    roomID: SetStateAction<number | null>;
    id_sala_presencial: number;
    id: any;
    tamanho(tamanho: any): unknown;
    id_sala: number;
    nome_sala: string;
    tipo_sala: string
    permissao_sala: string;
    link_sala: string;
    vagas_sala: number;
  }
