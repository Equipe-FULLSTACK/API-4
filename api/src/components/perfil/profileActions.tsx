import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip, // Importamos Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

interface ProfileActionsProps {
  onEditProfile: () => void;
  onSettings: () => void;
  onNotifications: () => void;
  profileImage: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditProfile, onSettings, onNotifications, profileImage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div>
      {/* Envolvemos o Avatar com Tooltip */}
      <Tooltip title="Ações de perfil" placement="bottom">
        <Avatar
          src={profileImage}
          alt="Foto de perfil"
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer' }}
        />
      </Tooltip>

      {/* Menu para exibir a lista de ações de perfil */}
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
        {/* Envolvemos os itens do Menu com Tooltip */}
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
      </Menu>
    </div>
  );
};

export default ProfileActions;
