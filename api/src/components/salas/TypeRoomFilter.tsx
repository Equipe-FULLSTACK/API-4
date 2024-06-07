import React from 'react'
import { TableCell, Button, Typography, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Room } from '../../types/roomTypes';
import { useState } from 'react';
import { Person, SupervisedUserCircle, Lock } from '@mui/icons-material';

type RoomFilterProps = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

interface RoomTypeFilterProps {
    roomTypeSelected: string;
    onRoomTypeChange: (roomType: string) => void;
}

const RoomTypeFilter: React.FC<RoomTypeFilterProps> = ({ roomTypeSelected, onRoomTypeChange }) => {
    const getColorByRoomType = (roomType: string) => {
        switch (roomType) {
            case 'Online':
                return { color: '#2196f3', icon: <SupervisedUserCircle />, description: 'Online' };
            case 'Presencial':
                return { color: '#4caf50', icon: <Person />, description: 'Presencial' };
            default:
                return { color: 'white', icon: <Person />, description: 'Todas as Salas' };
        }
    };

    return (
        <FormControl margin="normal" fullWidth>
            <InputLabel id="room-type-filter-label">Filtrar por Tipo de Sala</InputLabel>
            <Select
                labelId="room-type-filter-label"
                id="room-type-filter-select"
                value={roomTypeSelected}
                onChange={(e) => onRoomTypeChange(e.target.value)}
            >
                {['todos', 'Online', 'Presencial'].map(roomType => (
                    <MenuItem key={roomType} value={roomType}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <span style={{ color: getColorByRoomType(roomType).color }}>
                                {getColorByRoomType(roomType).icon}
                            </span>
                            <span>{roomType === 'todos' ? 'Todas as Salas' : getColorByRoomType(roomType).description}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RoomTypeFilter;
