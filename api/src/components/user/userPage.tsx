import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Paper,
    Button,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    SupervisedUserCircle as SupervisedUserCircleIcon,
} from '@mui/icons-material';
import { User } from '../../types/userTypes';
import NomeColumn from './NameColumn';
import EmailColumn from './EmailColumn';
import PermissaoColumn from './PermissionColumn';
import DiretoriaColumn from './DiretoriaColumn';

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
            setUsers(users.filter((user) => user.id_usuario !== userId));
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
                return { color: '#4caf50', icon: <PersonIcon />, description: 'Usuário padrão' };
            case '2':
                return { color: '#2196f3', icon: <SupervisedUserCircleIcon />, description: 'Super usuário' };
            case '3':
                return { color: '#f44336', icon: <LockIcon />, description: 'Admin' };
            default:
                return { color: 'primary', icon: <PersonIcon />, description: 'Super admin' };
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button disabled>
                                <Typography variant="body1" color="initial">Avatar</Typography>
                            </Button>
                        </TableCell>

                        <NomeColumn users={users} setUsers={setUsers} />

                        <EmailColumn users={users} setUsers={setUsers} />

                        <PermissaoColumn users={users} setUsers={setUsers} />

                        <DiretoriaColumn users={users} setUsers={setUsers} />

                        <TableCell>
                            <Button disabled>
                                <Typography variant="body1" color="initial">Ações</Typography>
                            </Button>
                        </TableCell>
                        
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id_usuario}>
                            <TableCell style={{ borderLeft: `4px solid ${getColorByPermission(user.permissao_usuario).color}` }}>
                                <Avatar alt={user.nome_usuario} src={user.userPhoto} />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" sx={{ color: getColorByPermission(user.permissao_usuario).color }}>
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
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ backgroundColor: getColorByPermission(user.permissao_usuario).color, borderRadius: 2, padding: '4px 16px', display: 'inline-flex' }}>
                                    {getColorByPermission(user.permissao_usuario).icon}
                                    <Typography variant="body2" sx={{ color: 'primary' }}>{getColorByPermission(user.permissao_usuario).description}</Typography>
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