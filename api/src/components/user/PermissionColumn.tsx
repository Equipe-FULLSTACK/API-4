// PermissionColumn.tsx
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { User } from '../../types/userTypes';

type PermissionColumnProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const PermissionColumn: React.FC<PermissionColumnProps> = ({ users, setUsers }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      const permissionA = parseInt(a.permissao_usuario);
      const permissionB = parseInt(b.permissao_usuario);

      if (newDirection === 'asc') {
        return permissionA - permissionB;
      } else {
        return permissionB - permissionA;
      }
    });

    setUsers(sortedUsers);
  };

  return (
    <TableCell>
      <Button onClick={handleSort}>
        <Typography variant="body1" color="initial">
          Permissão
          {sortDirection && (
            sortDirection === 'asc' ? ' ▲' : ' ▼'
          )}
        </Typography>
      </Button>
    </TableCell>
  );
};

export default PermissionColumn;
