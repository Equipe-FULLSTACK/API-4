export interface SalaPresencial {
  id_sala_presencial: number;
  nome: string;
  tamanho: 'Pequena' | 'Média' | 'Grande' | 'Auditório';
  vagas: number;
  permissao_sala: '1' | '2' | '3' | '4';
}

export interface SalaAvailable {
  id_sala_presencial: number;
  nome: string;
  tamanho: 'Pequena' | 'Média' | 'Grande' | 'Auditório';
  vagas: number;
  permissao_sala: '1' | '2' | '3' | '4';
  available: boolean;
}
