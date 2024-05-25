// PermissionColumn.tsx
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { Room } from '../../types/roomTypes';

type PermissionColumnProps = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

const PermissionColumn: React.FC<PermissionColumnProps> = ({ rooms, setRooms }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...rooms].sort((a, b) => {
      const permissionA = parseInt(a.permissao_sala);
      const permissionB = parseInt(b.permissao_sala);

      if (newDirection === 'asc') {
        return permissionA - permissionB;
      } else {
        return permissionB - permissionA;
      }
    });

    setRooms(sortedUsers);
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
