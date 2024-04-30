import React from 'react';
import { List, ListItem, IconButton, Tooltip } from '@mui/material';
import { CalendarToday, MeetingRoom, Settings, Notifications, HelpOutline, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate do React Router

interface NavBarProps {
  notificationCount?: number;
}

const NavBar: React.FC<NavBarProps> = ({ notificationCount = 5 }) => {
  const pages = ["/admin", "/rooms", "/admin/user", "/settings", "/notifications", "/help"];
  const navigate = useNavigate(); 

  const handleNavigation = (index: number) => {
    navigate(pages[index]);
  };

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        marginTop: 10,
        marginRight: 1,
        gap: 2,
      }}
    >
      {/* Ícone de Calendário com Tooltip e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(0)}>
        <Tooltip title="Calendário" placement="right">
          <IconButton color="inherit" size="large">
            <CalendarToday />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Salas com Tooltip e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(1)}>
        <Tooltip title="Salas" placement="right">
          <IconButton color="inherit" size="large">
            <MeetingRoom />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Pessoas com Tooltip e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(2)}>
        <Tooltip title="Pessoas" placement="right">
          <IconButton color="inherit" size="large">
            <Group />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Configurações com Tooltip e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(3)}>
        <Tooltip title="Configurações" placement="right">
          <IconButton color="inherit" size="large">
            <Settings />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Notificações com Tooltip, Badge e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(4)}>
        <Tooltip title="Notificações" placement="right">
          <IconButton color="inherit" size="small" sx={{ paddingLeft: 1.5 }}>
            <Notifications />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Ajuda com Tooltip e Navegação */}
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(5)}>
        <Tooltip title="Ajuda" placement="right">
          <IconButton color="inherit" size="large">
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default NavBar;
