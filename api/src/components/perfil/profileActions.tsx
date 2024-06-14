import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface User {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  diretoria_usuario: number;
  permissao_usuario: string;
  admin_usuario: number;
  userPhoto: string;
}

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditProfile, onSettings, onNotifications }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();
  const { userStatus, setUserStatus } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<User>(`http://localhost:3000/us/${userStatus.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userStatus.id]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('http://localhost:3000/logout')
      .then(() => {
        setUserStatus({
          id: 0,
          valid: false,
          username: '',
          admin: false,
          role: '0',
        });

        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  const isOpen = Boolean(anchorEl);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Tooltip title={userData?.nome_usuario} placement="bottom">
        <Avatar
          alt={userData?.nome_usuario || "Foto de perfil"}
          src={userData?.userPhoto}
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer', width: 56, height: 56 }}
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
