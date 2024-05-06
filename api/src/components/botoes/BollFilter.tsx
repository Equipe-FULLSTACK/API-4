import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

interface BoolFilterProps {
    value: number;
    onValueChange: (value: number) => void;
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
                value={value.toString()}
                onChange={(e) => onValueChange(Number(e.target.value))}
                variant="outlined"
            >
                <MenuItem key="1" value="1">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Check style={{ color: 'green' }} />
                        <span>Sim</span>
                    </Stack>
                </MenuItem>
                <MenuItem key="0" value="0">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Close style={{ color: 'red' }} />
                        <span>Não</span>
                    </Stack>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default BoolFilter;
