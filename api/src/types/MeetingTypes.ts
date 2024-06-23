export interface Meeting {
  id_reuniao: number;
  meeting_id: string;
  titulo: string;
  descricao: string; 
  data_inicio: Date;
  data_final: Date;
  duracao: number;
  timezone?: string;
  tipo: 'Presencial' | 'Hibrido' | 'Online';
  sala_presencial_id: number;
  sala_online_id: number; 
  organizador_id: number;
  meeting_link: string;
}
