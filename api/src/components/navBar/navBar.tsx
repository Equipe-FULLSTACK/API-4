import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  IconButton,
  Tooltip,
  Badge,
  Box,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { CalendarToday, MeetingRoom, Settings, Notifications, HelpOutline, Group, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const NavBar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openTooltip, setOpenTooltip] = useState(false);
  const pages = ["/admin", "/admin/rooms", "/admin/user", "/settings", "#", "/help"];
  const navigate = useNavigate();
  const { userStatus } = useUser();

  interface Notification {
    id_notificacao: number;
    mensagem: string;
    reuniao_id: number;
    lida: number;
    data_notificacao: string;
  }

  useEffect(() => {
    if (userStatus?.admin !== null) {
      if (userStatus?.admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [userStatus]);

  useEffect(() => {
    axios.get('http://localhost:3000/ck')
      .then(res => {
        if (res.data.valid && res.data.admin === '1') {
          setIsAdmin(true);
        } else if (res.data.admin === '0') {
          setIsAdmin(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>(`http://localhost:3000/notificacao/usuario/${userStatus?.id}`);
        setNotifications(response.data.filter(notification => notification.lida === 0));
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotifications();
  }, [userStatus?.id]);

  const handleReadConfirmation = async (id: number) => {
    try {
      await axios.put(`http://localhost:3000/notificacao/${id}`, { lida: 1 });
      setNotifications((prevNotifications) =>
        prevNotifications.filter(notification => notification.id_notificacao !== id)
      );
    } catch (error) {
      console.error('Erro ao confirmar leitura:', error);
    }
  };

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
      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(0)}>
        <Tooltip title="Calendário" placement="right">
          <IconButton color="inherit" size="large">
            <CalendarToday />
          </IconButton>
        </Tooltip>
      </ListItem>

      {isAdmin && (
        <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(1)}>
          <Tooltip title="Salas" placement="right">
            <IconButton color="inherit" size="large">
              <MeetingRoom />
            </IconButton>
          </Tooltip>
        </ListItem>
      )}

      {isAdmin && (
        <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(2)}>
          <Tooltip title="Pessoas" placement="right">
            <IconButton color="inherit" size="large">
              <Group />
            </IconButton>
          </Tooltip>
        </ListItem>
      )}

      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(3)}>
        <Tooltip title="Configurações" placement="right">
          <IconButton color="inherit" size="large">
            <Settings />
          </IconButton>
        </Tooltip>
      </ListItem>

      <ListItem sx={{ padding: 0 }} onClick={() => handleNavigation(4)}>
        <Tooltip
          title={
            <Box sx={{ maxWidth: 500 }}>
              <Typography variant="h6" component="div">
                Notificações
              </Typography>
              <List>
                {notifications.map((notification) => (
                  <ListItem key={notification.id_notificacao} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={notification.mensagem}
                      secondary={new Date(notification.data_notificacao).toLocaleString()}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="confirm"
                        onClick={() => handleReadConfirmation(notification.id_notificacao)}
                      >
                        <CheckCircle color="info" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          }
          placement="right"
          open={openTooltip}
          onOpen={() => setOpenTooltip(true)}
          onClose={() => setOpenTooltip(false)}
        >
          <Badge badgeContent={notifications.length} color="error">
            <IconButton color="inherit" size="large">
              <Notifications />
            </IconButton>
          </Badge>
        </Tooltip>
      </ListItem>

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
