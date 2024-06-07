import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Person, SupervisedUserCircle, Lock } from '@mui/icons-material';

interface PermissionFilterProps {
    permissionSelected: string;
    onPermissionChange: (permission: string) => void;
}

const PermissionFilter: React.FC<PermissionFilterProps> = ({ permissionSelected, onPermissionChange }) => {
    // Definindo cores para cada tipo de permissão
    const getColorByPermission = (permissionLevel: string) => {
        switch (permissionLevel) {
            case '1':
                return { color: '#4caf50', icon: <Person />, description: 'Nível 1' };
            case '2':
                return { color: '#2196f3', icon: <SupervisedUserCircle />, description: 'Nível 2' };
            case '3':
                return { color: '#f44336', icon: <Lock />, description: 'Nível 3' };
            default:
                return { color: 'white', icon: <Person />, description: 'Nível 1' };
        }
    };

    return (
        <FormControl margin="normal" fullWidth>
            {/* Exibe o label atualizado com base na permissão selecionada */}
            <InputLabel id="permission-filter-label">Filtrar por Permissão</InputLabel>
            <Select
                labelId="permission-filter-label"
                id="permission-filter-select"
                value={permissionSelected}
                onChange={(e) => onPermissionChange(e.target.value)}
            >
                {/* Renderiza as opções de seleção com ícones */}
                {['todos', '1', '2', '3'].map(permission => (
                    <MenuItem key={permission} value={permission}>
                        {/* Renderiza o ícone ao lado do tipo de permissão */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <span style={{ color: getColorByPermission(permission).color }}>
                                {getColorByPermission(permission).icon}
                            </span>
                            <span>{permission === 'todos' ? 'Todas as Permissões' : getColorByPermission(permission).description}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PermissionFilter;
