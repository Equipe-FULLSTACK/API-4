import React from 'react';
import { Badge, List, ListItem, IconButton, Tooltip } from '@mui/material';
import {
  CalendarToday,
  MeetingRoom,
  Settings,
  Notifications,
  HelpOutline,
  Group,
} from '@mui/icons-material';

interface NavBarProps {
  onCalendarClick?: () => void;
  onRoomsClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onHelpClick?: () => void;
  onPeopleClick?: () => void;
  notificationCount?: number;
}

const NavBar: React.FC<NavBarProps> = ({
  onCalendarClick,
  onRoomsClick,
  onSettingsClick,
  onNotificationsClick,
  onHelpClick,
  onPeopleClick,
  notificationCount = 5, 
}) => {
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
      {/* Ícone de Calendário com Tooltip */}
      <ListItem onClick={onCalendarClick} sx={{ padding: 0 }}>
        <Tooltip title="Calendário" placement="right">
          <IconButton color="inherit" size="large">
            <CalendarToday />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Salas com Tooltip */}
      <ListItem onClick={onRoomsClick} sx={{ padding: 0 }}>
        <Tooltip title="Salas" placement="right">
          <IconButton color="inherit" size="large">
            <MeetingRoom />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Pessoas com Tooltip */}
      <ListItem onClick={onPeopleClick} sx={{ padding: 0 }}>
        <Tooltip title="Pessoas" placement="right">
          <IconButton color="inherit" size="large">
            <Group />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Configurações com Tooltip */}
      <ListItem onClick={onSettingsClick} sx={{ padding: 0 }}>
        <Tooltip title="Configurações" placement="right">
          <IconButton color="inherit" size="large">
            <Settings />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* Ícone de Notificações com Tooltip e Badge */}
      <ListItem onClick={onNotificationsClick} sx={{ padding: 0 }}>
        <Tooltip title="Notificações" placement="right">
          <Badge badgeContent={notificationCount} color="warning" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <IconButton color="inherit" size="small" sx={{paddingLeft:1.5}}>
              <Notifications />
            </IconButton>
          </Badge>
        </Tooltip>
      </ListItem>

      {/* Ícone de Ajuda com Tooltip */}
      <ListItem onClick={onHelpClick} sx={{ padding: 0 }}>
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
