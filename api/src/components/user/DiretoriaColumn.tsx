// DiretoriaColumn.tsx
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { User } from '../../types/userTypes';

type DiretoriaColumnProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const DiretoriaColumn: React.FC<DiretoriaColumnProps> = ({ users, setUsers }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      if (newDirection === 'asc') {
        return a.diretoria_usuario - b.diretoria_usuario;
      } else {
        return b.diretoria_usuario - a.diretoria_usuario;
      }
    });

    setUsers(sortedUsers);
  };

  return (
    <TableCell>
      <Button onClick={handleSort}>
        <Typography variant="body1" color="initial">
          Diretoria
          {sortDirection && (
            sortDirection === 'asc' ? ' ▲ ' : ' ▼ '
          )}
        </Typography>
      </Button>
    </TableCell>
  );
};

export default DiretoriaColumn;
