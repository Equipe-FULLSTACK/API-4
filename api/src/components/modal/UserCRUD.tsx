import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, FormControl, TextField, Stack } from '@mui/material';
import PermissionFilter from '../user/PermissionFilter';
import BoolFilter from '../botoes/BollFilter';
import EmailInput from '../form/EmailInput';
import PasswordComparison from '../form/PasswordComparison';
import BtnSIATT from '../botoes/btnSIATTLogo';
import axios from 'axios';
import { AccountCircle } from '@mui/icons-material';
import { User } from './userTypes';

const UserCRUD = ({ open, onClose, user, onAddUser, onUpdateUser, onRemoveUser }: { open: boolean, onClose: () => void, user: User | null, onAddUser: (userData: User) => void, onUpdateUser: (userData: User) => void, onRemoveUser: (userId: number) => void }) => {
    const [formData, setFormData] = useState<User>({
        id_usuario: user?.id_usuario || null,
        nome_usuario: user?.nome_usuario || '',
        email_usuario: user?.email_usuario || '',
        senha_usuario: user?.senha_usuario || '',
        diretoria_usuario: user?.diretoria_usuario || false,
        permissao_usuario: user?.permissao_usuario || '',
        admin_usuario: user?.admin_usuario || false,
        userPhoto: user?.userPhoto || '',
    });

    useEffect(() => {
        setFormData({
            id_usuario: user?.id_usuario || null,
            nome_usuario: user?.nome_usuario || '',
            email_usuario: user?.email_usuario || '',
            senha_usuario: user?.senha_usuario || '',
            diretoria_usuario: user?.diretoria_usuario || false,
            permissao_usuario: user?.permissao_usuario || '',
            admin_usuario: user?.admin_usuario || false,
            userPhoto: user?.userPhoto || '',
        });
    }, [user]);

    const [tipoSelecionado, setTipoSelecionado] = useState('1');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [email, setEmail] = useState('');
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData: User) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleTipoChange = (novoTipo: string) => {
        setTipoSelecionado(novoTipo);
    };

    const isFormComplete = formData.nome_usuario && formData.email_usuario && formData.senha_usuario && formData.permissao_usuario && isEmailValid && isPasswordMatched;

    const handleSave = async () => {
        try {
            if (formData.id_usuario) {
                await axios.put(`http://localhost:3000/us/${formData.id_usuario}`, formData);
                onUpdateUser(formData);
            } else {
                const response = await axios.post('http://localhost:3000/us', formData);
                onAddUser(response.data);
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleRemove = async () => {
        try {
            if (formData.id_usuario) {
                await axios.delete(`http://localhost:3000/us/${formData.id_usuario}`);
                onRemoveUser(formData.id_usuario);
                onClose();
            }
        } catch (error) {
            console.error('Erro ao remover usuário:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    backgroundColor: '#2F2F2F',
                    border: '1px solid #000',
                    boxShadow: 24,
                    padding: 4,
                    zIndex: 1300
                }}
            >
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                    <Typography variant="h4">
                        {formData.id_usuario ? 'Editar Usuário' : 'Adicionar Usuário'}
                    </Typography>
                    <BtnSIATT disable={true}></BtnSIATT>
                </Stack>

                <Stack>
                    <TextField
                        label="Nome"
                        name="nome_usuario"
                        value={formData.nome_usuario}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <EmailInput value={email} onChange={setEmail} onValidChange={setIsEmailValid} />
                </Stack>

                <PasswordComparison direction='row' onPasswordMatchChange={(isMatch) => setIsPasswordMatched(isMatch)} />

                <Stack direction={'row'} gap={5}>
                    <FormControl fullWidth margin="normal">
                        <BoolFilter label='Diretoria' value={formData.diretoria_usuario} onValueChange={(value) => handleChange({ target: { name: 'diretoria_usuario', value: value } })} />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <PermissionFilter permissionSelected={tipoSelecionado} onPermissionChange={handleTipoChange} />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <BoolFilter label='Administrador' value={formData.admin_usuario} onValueChange={(value) => handleChange({ target: { name: 'admin_usuario', value: value } })} />
                    </FormControl>

                </Stack>
                <Box display="flex" justifyContent="space-between" mt={3}>
                    {formData.id_usuario && (
                        <Button variant="outlined" color="secondary" onClick={handleRemove}>
                            Remover
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isFormComplete}
                    >
                        Salvar
                    </Button>
                    <Button variant="text" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserCRUD;
