
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { User } from '../../types/userTypes';

type NameColumnProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const NameColumn: React.FC<NameColumnProps> = ({ users, setUsers }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a.nome_usuario.toLowerCase();
      const bValue = b.nome_usuario.toLowerCase();

      if (newDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setUsers(sortedUsers);
  };

  return (
    <TableCell>
      <Button onClick={handleSort}>
        <Typography variant="body1" color="initial">
          Nome
          {sortDirection && (
            sortDirection === 'asc' ? ' ▲' : ' ▼'
          )}
        </Typography>
      </Button>
    </TableCell>
  );
};

export default NameColumn;
