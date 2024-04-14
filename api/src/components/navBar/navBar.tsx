import React from 'react';
import { List, ListItem, IconButton, Tooltip, useTheme } from '@mui/material';
import {
  CalendarToday,
  MeetingRoom,
  Settings,
  Notifications,
  HelpOutline,
} from '@mui/icons-material';

interface NavBarProps {
  onCalendarClick: () => void; // Função para lidar com clique em Calendário
  onRoomsClick: () => void; // Função para lidar com clique em Salas
  onSettingsClick: () => void; // Função para lidar com clique em Configurações
  onNotificationsClick: () => void; // Função para lidar com clique em Notificações
  onHelpClick: () => void; // Função para lidar com clique em Ajuda
}

const NavBar: React.FC<NavBarProps> = ({
  onCalendarClick,
  onRoomsClick,
  onSettingsClick,
  onNotificationsClick,
  onHelpClick,
}) => {
  // Obtenha o tema para ajustar o estilo
  const theme = useTheme();

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        marginTop: 10,
        marginRight: 1,
        gap: 2
      }}
    >
      {/* Ícone de Calendário com Tooltip */}
      <ListItem button onClick={onCalendarClick} sx={{ padding: 0 }}>
        <Tooltip title="Calendário" placement="right">
          <IconButton color="inherit">
            <CalendarToday />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Salas com Tooltip */}
      <ListItem button onClick={onRoomsClick} sx={{ padding: 0 }}>
        <Tooltip title="Salas" placement="right">
          <IconButton color="inherit">
            <MeetingRoom />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Configurações com Tooltip */}
      <ListItem button onClick={onSettingsClick} sx={{ padding: 0 }}>
        <Tooltip title="Configurações" placement="right">
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Notificações com Tooltip */}
      <ListItem button onClick={onNotificationsClick} sx={{ padding: 0 }}>
        <Tooltip title="Notificações" placement="right">
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Ajuda com Tooltip */}
      <ListItem button onClick={onHelpClick} sx={{ padding: 0 }}>
        <Tooltip title="Ajuda" placement="right">
          <IconButton color="inherit">
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default NavBar;
