
import React, { useState } from 'react';
import { TableCell, Button, Typography } from '@mui/material';
import { Room } from '../../types/roomTypes';

type NameColumnProps = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

const NameColumn: React.FC<NameColumnProps> = ({ rooms, setRooms }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedUsers = [...rooms].sort((a, b) => {
      const aValue = a.nome_sala.toLowerCase();
      const bValue = b.nome_sala.toLowerCase();

      if (newDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setRooms(sortedUsers);
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
