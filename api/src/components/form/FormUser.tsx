// FormUser.tsx

import React from 'react';
import { Stack, Typography, TextField, FormControl } from '@mui/material';
import PermissionFilter from '../user/PermissionFilter';
import BoolFilter from '../botoes/BollFilter';
import EmailInput from './EmailInput';
import PasswordComparison from './PasswordComparison';
import BtnSIATT from '../botoes/btnSIATTLogo';

interface FormUserProps {
    formData: any;
    name: string;
    email: string;
    password: string;
    diretoria: number;
    admin: number;
    tipoSelecionado: string;
    handleValueNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (value: string) => void;
    handlePasswordMatchChange: (isMatch: boolean, password: string) => void;
    handleValueDiretoriaChange: (value: number) => void;
    handleValueAdminChange: (value: number) => void;
    handleTipoChange: (novoTipo: string) => void;
}

const FormUser: React.FC<FormUserProps> = ({
    formData,
    name,
    email,
    password,
    diretoria,
    admin,
    tipoSelecionado,
    handleValueNameChange,
    handleEmailChange,
    handlePasswordMatchChange,
    handleValueDiretoriaChange,
    handleValueAdminChange,
    handleTipoChange
}) => {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h4">
                    {formData.id_usuario ? 'Editar Usuário' : 'Adicionar Usuário'}
                </Typography>
                <BtnSIATT disable={true}></BtnSIATT>
            </Stack>

            <Stack>
                <TextField
                    label="Nome"
                    name="Nome do usuário"
                    value={name}
                    onChange={handleValueNameChange}
                    fullWidth
                    margin="normal"
                />

                <EmailInput value={email} onChange={handleEmailChange} onValidChange={(value: boolean) => {}} />
            </Stack>

            <PasswordComparison
                direction='row'
                onPasswordMatchChange={handlePasswordMatchChange}
                password={password}
            />
            <Stack direction={'row'} gap={5}>
                <FormControl fullWidth margin="normal">
                    <BoolFilter value={diretoria} onValueChange={handleValueDiretoriaChange} label="Diretoria" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <PermissionFilter permissionSelected={tipoSelecionado} onPermissionChange={handleTipoChange} />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <BoolFilter value={admin} onValueChange={handleValueAdminChange} label="Administrador" />
                </FormControl>
            </Stack>
        </>
    );
};

export default FormUser;
