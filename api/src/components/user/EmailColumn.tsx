// PermissaoColumn.tsx
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { User } from '../../types/userTypes';

type PermissaoColumnProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const PermissaoColumn: React.FC<PermissaoColumnProps> = ({ users, setUsers }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = parseInt(a.permissao_usuario);
      const bValue = parseInt(b.permissao_usuario);

      return newDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setUsers(sortedUsers);
  };

  return (
    <TableCell>
      <Button onClick={handleSort} >
        <Typography variant="body1" color="initial">
          E-mail
          {sortDirection && (
            sortDirection === 'asc' ? ' ▲' : ' ▼'
          )}
        </Typography>
      </Button>
    </TableCell>
  );
};

export default PermissaoColumn;
