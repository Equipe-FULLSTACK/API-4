import React from 'react';
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
} from '@mui/icons-material';
import NomeColumn from './NameColumn';
import PermissaoColumn from './PermissionColumn';
import DiretoriaColumn from './TypeColumn';
import { Room } from '../../types/RoomTypes';

interface RoomTableProps {
    rooms: Room[];
    setRooms: React.Dispatch<React.SetStateAction<Room[]>>; // Função de atualização de salas
    onDeleteRoom?: (roomId: number) => void;
    onEditPermission?: (roomId: number) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms, setRooms, onDeleteRoom, onEditPermission }) => {
    const getColorByPermission = (permissionLevel: string) => {
        switch (permissionLevel) {
            case '1':
                return { color: '#4caf50', icon: <PersonIcon />, description: 'Usuário padrão' };
            case '2':
                return { color: '#2196f3', icon: <SupervisedroomCircleIcon />, description: 'Super usuário' };
            case '3':
                return { color: '#f44336', icon: <LockIcon />, description: 'Admin' };
            default:
                return { color: 'primary', icon: <PersonIcon />, description: 'Super admin' };
        }
    };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await axios.delete(`http://localhost:3000/sala/${roomId}`);
            // Se a exclusão for bem-sucedida, atualize a lista de salas localmente
            const updatedRooms = rooms.filter(room => room.id !== roomId);
            setRooms(updatedRooms);
            alert('Sala excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir sala:', error);
            alert('Erro ao excluir sala. Por favor, tente novamente.');
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button disabled>
                            </Button>
                        </TableCell>

                        <NomeColumn rooms={rooms} setRooms={setRooms} />

                        <PermissaoColumn rooms={rooms} setRooms={setRooms}  />

                        <DiretoriaColumn rooms={rooms} setRooms={setRooms}  />

                        <TableCell>
                            <Button disabled>
                                <Typography variant="body1" color="initial">Ações</Typography>
                            </Button>
                        </TableCell>
                        
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rooms.map((room) => (
                        <TableRow key={room.id_sala}>
                            <TableCell style={{ borderLeft: `4px solid ${getColorByPermission(room.tipo_sala).color}` }}>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" sx={{ color: getColorByPermission(room.tipo_sala).color }}>
                                    {room.nome_sala}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ backgroundColor: getColorByPermission(room.tipo_sala).color, borderRadius: 2, padding: '4px 16px', display: 'inline-flex' }}>
                                    {getColorByPermission(room.tipo_sala).icon}
                                    <Typography variant="body2" sx={{ color: 'primary' }}>{getColorByPermission(room.tipo_sala).description}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {room.permissao_sala ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    <Typography variant="body2">{room.permissao_sala ? 'Sim' : 'Não'}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Delete">
                                    <IconButton onClick={() => onDeleteRoom && onDeleteRoom(room.id_sala)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Tooltip>
                                    {onEditPermission && (
                                        <Tooltip title="Edit Permission">
                                            <IconButton onClick={() => onEditPermission(room.id_sala)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoomTable;

