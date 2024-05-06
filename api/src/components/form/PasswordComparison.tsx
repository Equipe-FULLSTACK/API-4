import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, Stack } from '@mui/material';
import PasswordInput from './PasswordInput';

interface PasswordComparisonProps {
    onPasswordMatchChange: (isMatch: boolean) => void;
    direction: 'row' | 'column';
}

const PasswordComparison: React.FC<PasswordComparisonProps> = ({ onPasswordMatchChange, direction }) => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    // Função para comparar as senhas
    useEffect(() => {
        const comparePasswords = () => {
            if (password1 === password2 && password1 !== '' && password2 !== '') {
                setIsMatch(true);
                onPasswordMatchChange(true);
            } else {
                setIsMatch(false);
                onPasswordMatchChange(false);
            }
        };
        
        comparePasswords();
    }, [password1, password2, onPasswordMatchChange]);

    const handlePassword1Change = (value: string) => {
        setPassword1(value);
    };

    const handlePassword2Change = (value: string) => {
        setPassword2(value);
    };

    return (
        <FormControl fullWidth margin="normal">
            <Typography variant="h6">Confirme sua senha</Typography>
            <Stack direction={direction} gap={5}>
                <PasswordInput
                    value={password1}
                    onChange={handlePassword1Change}
                    onValidChange={() => { }}
                />
                <PasswordInput
                    value={password2}
                    onChange={handlePassword2Change}
                    onValidChange={() => { }}
                />
            </Stack>
            <Box mt={1}>
                <Typography variant="body2" color={isMatch ? 'yellow' : 'error'}>
                    {isMatch ? 'As senhas correspondem' : 'As senhas não correspondem'}
                </Typography>
            </Box>
        </FormControl>
    );
};

export default PasswordComparison;
