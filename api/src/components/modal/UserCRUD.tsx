import React, { useState, useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';
import FormUser from '../form/FormUser';
import axios from 'axios';
import { User } from '../../types/userTypes';

const UserCRUD = ({ open, onClose, user, onAddUser, onUpdateUser, onRemoveUser }: { open: boolean, onClose: () => void, user: User | null, onAddUser: (userData: User) => void, onUpdateUser: (userData: User) => void, onRemoveUser: (userId: number) => void }) => {
    const [formData, setFormData] = useState<User>({
        id_usuario: 0,
        nome_usuario: '',
        email_usuario: '',
        senha_usuario: '',
        diretoria_usuario: 0,
        permissao_usuario: '',
        admin_usuario: 0,
        userPhoto: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id_usuario: user.id_usuario || 0,
                nome_usuario: user.nome_usuario || '',
                email_usuario: user.email_usuario || '',
                senha_usuario: user.senha_usuario || '',
                diretoria_usuario: user.diretoria_usuario || 0,
                permissao_usuario: user.permissao_usuario || '',
                admin_usuario: user.admin_usuario || 0,
                userPhoto: user.userPhoto || '',
            });
        }
    }, [user]);

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
            alert("Usuário Salvo com Sucesso!") 
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleRemove = async () => {
        try {
            if (formData.id_usuario) {
                console.log('Usuario a deletar', formData.id_usuario)
                await axios.delete(`http://localhost:3000/us/${formData.id_usuario}`);
                onRemoveUser(formData.id_usuario);
                onClose();
            }
            alert("Usuário Removido com Sucesso!") 
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
                <FormUser
                    formData={formData}
                    name={formData.nome_usuario}
                    email={formData.email_usuario}
                    password={formData.senha_usuario}
                    diretoria={formData.diretoria_usuario}
                    admin={formData.admin_usuario}
                    tipoSelecionado={formData.permissao_usuario}
                    handleValueNameChange={(event) => setFormData({ ...formData, nome_usuario: event.target.value })}
                    handleEmailChange={(value) => setFormData({ ...formData, email_usuario: value })}
                    handlePasswordMatchChange={(isMatch, password) => setFormData({ ...formData, senha_usuario: password })}
                    handleValueDiretoriaChange={(value) => setFormData({ ...formData, diretoria_usuario: value })}
                    handleValueAdminChange={(value) => setFormData({ ...formData, admin_usuario: value })}
                    handleTipoChange={(novoTipo) => setFormData({ ...formData, permissao_usuario: novoTipo })}
                />

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
                        disabled={false}
                        /* disabled={!formData.nome_usuario || !formData.email_usuario || !formData.senha_usuario}
                         */>
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
