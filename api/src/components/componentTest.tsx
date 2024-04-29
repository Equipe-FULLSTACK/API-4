import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Stack, Tooltip, Avatar, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { User } from '../types/userTypes';

const API_URL = 'http://localhost:3000';

const PageTest = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/us`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}/us/${userId}`);
      setUsers(users.filter(user => user.id_usuario !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditPermission = (userId: number) => {
    console.log(`Editing permission for user with ID ${userId}`);
  };

  const getColorByPermission = (permissionLevel: string) => {
    switch (permissionLevel) {
      case '1':
        return '#4caf50'; // Verde
      case '2':
        return '#2196f3'; // Azul
      case '3':
        return '#f44336'; // Vermelho
      default:
        return '#000000'; // Preto como padrão
    }
  };

  const usersByPermission = users.reduce((acc, user) => {
    const permissionLevel = user.permissao_usuario;
    if (!acc[permissionLevel]) {
      acc[permissionLevel] = [];
    }
    acc[permissionLevel].push(user);
    return acc;
  }, {});

  return (
    <Grid container spacing={3}>
      {Object.entries(usersByPermission).map(([permissionLevel, users]) => (
        <Grid item key={permissionLevel} xs={12} sm={6} md={4} lg={3}>
          {users.map(user => (
            <Card key={user.id_usuario} sx={{ marginBottom: 1, borderLeft: `4px solid ${getColorByPermission(permissionLevel)}`, backgroundColor: `rgba(255, 255, 255, 0.1)`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" marginBottom={1} gap={2}>
                    <Avatar alt={user.nome_usuario} src={user.userPhoto} sx={{ width: 60, height: 60 }} />
                    <Typography color={'Background'} variant="body1" sx={{ color: getColorByPermission(permissionLevel), marginLeft: 1 }}>
                      {user.nome_usuario}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                    Email: {user.email_usuario}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                    Permission: {permissionLevel}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                    Diretoria: {user.diretoria_usuario ? 'Sim' : 'Não'}
                  </Typography>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" marginTop={1}>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteUser(user.id_usuario)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Permission">
                      <IconButton onClick={() => handleEditPermission(user.id_usuario)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
            </Card>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default PageTest;
