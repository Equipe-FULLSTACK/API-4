import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Avatar, IconButton, Stack, Tooltip, Typography, Paper } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Person as PersonIcon, Email as EmailIcon, Lock as LockIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, SupervisedUserCircle as SupervisedUserCircleIcon } from '@mui/icons-material';
import { User } from '../../types/userTypes';

const API_URL = 'http://localhost:3000';

const UserPage = () => {
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
                return { color: '#4caf50', icon: <PersonIcon />, description: 'Usuário padrão' }; // Verde, ícone de pessoa
            case '2':
                return { color: '#2196f3', icon: <SupervisedUserCircleIcon />, description: 'Super usuário' }; // Azul, ícone de supervisão
            case '3':
                return { color: '#f44336', icon: <LockIcon />, description: 'Admin' }; // Vermelho, ícone de cadeado
            default:
                return { color: '#000000', icon: <PersonIcon />, description: 'Super admin' }; // Preto como padrão, ícone de pessoa
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ borderLeft: '4px solid #4caf50' }}>Avatar</TableCell> {/* Adicionando borda esquerda verde */}
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Permissão</TableCell>
                        <TableCell>Diretoria</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id_usuario}>
                            <TableCell style={{ borderLeft: `4px solid ${getColorByPermission(user.permissao_usuario).color}` }}>
                                <Avatar alt={user.nome_usuario} src={user.userPhoto} />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" sx={{ color: '#000000' }}>{/* Mantendo o padrão de cores */}
                                    {user.nome_usuario}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <EmailIcon />
                                    <Typography variant="body2">{user.email_usuario}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ backgroundColor: getColorByPermission(user.permissao_usuario).color, borderRadius: 8, padding: '4px 8px', display: 'inline-flex' }}>
                                    {getColorByPermission(user.permissao_usuario).icon}
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>{getColorByPermission(user.permissao_usuario).description}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {user.diretoria_usuario ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    <Typography variant="body2">{user.diretoria_usuario ? 'Sim' : 'Não'}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserPage;
