import React, { useState, useEffect } from 'react';
import { TextField, Box, Chip, Avatar, MenuItem, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { User } from '../../../../types/userTypes';

interface UserSelectProps {
  users: User[];
  onChange: (selectedUsers: User[]) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const UserSelect: React.FC<UserSelectProps> = ({ users, onChange }) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    setSuggestions(
      users.filter(
        (user) =>
          user.nome_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email_usuario.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleAddUser = (user: User) => {
    if (!selectedUsers.some((u) => u.id_usuario === user.id_usuario)) {
      const updatedSelectedUsers = [...selectedUsers, user];
      setSelectedUsers(updatedSelectedUsers);
      onChange(updatedSelectedUsers);
    }
    setSearchTerm('');
  };

  const handleRemoveUser = (user: User) => {
    const updatedSelectedUsers = selectedUsers.filter((u) => u.id_usuario !== user.id_usuario);
    setSelectedUsers(updatedSelectedUsers);
    onChange(updatedSelectedUsers);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <TextField
          label="Adicionar participantes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: 'inherit',
            input: { color: '#fff' },
            label: { color: '#fff' }
          }}
        />
        {searchTerm && (
          <Box sx={{
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: '#2F2F2F',
            width: '100%',
            boxShadow: 2,
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {suggestions.map((user) => (
              <MenuItem
                key={user.id_usuario}
                onClick={() => handleAddUser(user)}
                sx={{ display: 'flex', alignItems: 'center', gap: 2,background:'#2F2F2F', color: '#fff' }}
              >
                <Avatar src={user.userPhoto} />
                <Box>
                  <Typography variant="body1">{user.nome_usuario}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.email_usuario}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, mb: 2 }}>
          {selectedUsers.map((user) => (
            <Chip
              key={user.id_usuario}
              avatar={<Avatar src={user.userPhoto} />}
              label={user.nome_usuario}
              onDelete={() => handleRemoveUser(user)}
              sx={{ backgroundColor: '#616161', color: '#fff', mb: 1 }} // Adiciona margem inferior
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserSelect;
