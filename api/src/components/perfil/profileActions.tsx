import React from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditProfile, onSettings, onNotifications }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('http://localhost:3000/logout') // Fazendo a requisição POST para o endpoint /logout
      .then(() => {
        // Redirecionando para a página inicial após o logout
        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div>
      <Tooltip title="Ações de perfil" placement="bottom">
        <Avatar
          alt="Foto de perfil"
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer' }}
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Tooltip title="Editar Perfil" placement="left">
          <MenuItem onClick={onEditProfile}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Editar Perfil" />
          </MenuItem>
        </Tooltip>

        <Tooltip title="Configurações" placement="left">
          <MenuItem onClick={onSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </MenuItem>
        </Tooltip>

        <Tooltip title="Notificações" placement="left">
          <MenuItem onClick={onNotifications}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notificações" />
          </MenuItem>
        </Tooltip>

        {/* Botão de Logout */}
        <Tooltip title="Sair" placement="left">
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </MenuItem>
        </Tooltip>
      </Menu>
    </div>
  );
};

export default ProfileActions;
