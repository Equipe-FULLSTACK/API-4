export interface Meeting {
  id_reuniao: number;
  titulo: string;
  descricao: string; 
  data_inicio: Date;
  data_final: Date;
  timezone?: string;
  tipo: 'Presencial' | 'Hibrido' | 'Online';
  sala_presencial_id: number;
  sala_online_id: number; 
  organizador_id: number;
}
