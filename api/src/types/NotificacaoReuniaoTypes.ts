export interface NotificacaoReuniao {
  id_notificacao: number;
  mensagem: string;
  usuario_id: number;
  reuniao_id: number;
  lida: boolean;
  data_notificacao: Date;
}
