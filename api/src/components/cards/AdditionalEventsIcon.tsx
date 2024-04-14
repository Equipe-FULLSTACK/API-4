import React from 'react';
import { IconButton, Typography, Stack, Box } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

interface AdditionalEventsIconProps {
    numAdicionais: number;
}

const AdditionalEventsIcon: React.FC<AdditionalEventsIconProps> = ({ numAdicionais }) => {
    return (
        <IconButton
            size="small"
            sx={{
                backgroundColor: '#f44336',
                color: 'white',
                borderRadius: '50%',
                padding: 0.5,
                marginLeft: 'auto',
            }}
        >
            <Stack direction="row" alignItems="center">
                <Typography variant="body2" sx={{ marginRight: 0.5 }}>
                    {numAdicionais}
                </Typography>
                <MoreHoriz />
            </Stack>
        </IconButton>
    );
};

export default AdditionalEventsIcon;
