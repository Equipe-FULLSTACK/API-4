// DiretoriaColumn.tsx
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { Room } from '../../types/roomTypes';

type TypeColumnProps = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

const TypeColumn: React.FC<TypeColumnProps> = ({ rooms, setRooms }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedRooms = [...rooms].sort((a, b) => {

      const permissionA = parseInt(a.tipo_sala);
      const permissionB = parseInt(b.tipo_sala);
      if (newDirection === 'asc') {
        return permissionA - permissionB;
      } else {
        return permissionB - permissionA;
      }
    });

    setRooms(sortedRooms);
  };

  return (
    <TableCell>
      <Button onClick={handleSort}>
        <Typography variant="body1" color="initial">
          Nível de Acesso
          {sortDirection && (
            sortDirection === 'asc' ? ' ▲ ' : ' ▼ '
          )}
        </Typography>
      </Button>
    </TableCell>
  );
};

export default TypeColumn;
