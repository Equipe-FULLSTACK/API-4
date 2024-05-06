import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

interface BoolFilterProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label: string;
}

const BoolFilter: React.FC<BoolFilterProps> = ({ value, onValueChange, label }) => {
    return (
        <FormControl margin="normal" fullWidth>
            {/* Exibe o label */}
            <InputLabel id="bool-filter-label">{label}</InputLabel>
            <Select
                labelId="bool-filter-label"
                id="bool-filter-select"
                value={value.toString()} // Converte o valor booleano para string
                onChange={(e) => onValueChange(e.target.value === 'true')} // Converte o valor de string para booleano
                variant="outlined"
            >
                {/* Renderiza as opções de seleção */}
                {[false, true].map(boolValue => (
                    <MenuItem key={boolValue.toString()} value={boolValue.toString()}>
                        {/* Renderiza o ícone ao lado do valor */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {boolValue ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />}
                            <span>{boolValue ? 'Sim' : 'Não'}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BoolFilter;
