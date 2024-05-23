export interface PreferenciasUsuario {
  id_preferencias: number;
  usuario_id: number;
  tema: 'Dark' | 'Light' | 'Compatibilidade';
  idioma: 'Português' | 'Inglês' | 'Espanhol';
  notificacoes_ativadas: boolean;
  notificacoes_email: boolean;
  notificacoes_sms: boolean;
  notificacoes_whatsapp: boolean;
}