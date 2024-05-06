import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

interface BoolFilterProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
}

const testComponent: React.FC<BoolFilterProps> = ({ value, onValueChange }) => {
    return (
        <FormControl margin="normal" fullWidth>
            <InputLabel id="bool-filter-label">Filtrar por Valor</InputLabel>
            <Select
                labelId="bool-filter-label"
                id="bool-filter-select"
                value={value.toString()} // Converte o valor booleano para string
                onChange={(e) => onValueChange(e.target.value === 'true')} // Converte o valor de string para booleano
            >
                {/* Renderiza as opções de seleção */}
                {[true, false].map(boolValue => (
                    <MenuItem key={boolValue.toString()} value={boolValue.toString()}>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <span style={{ color: boolValue ? 'green' : 'red' }}>
                                {boolValue ? <Check /> : <Close />}
                            </span>
                            <span>{boolValue ? 'Sim' : 'Não'}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default testComponent;
