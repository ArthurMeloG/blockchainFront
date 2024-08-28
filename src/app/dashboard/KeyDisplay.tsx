import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const KeyDisplay = ({ title, keyValue }) => {
    const [showKey, setShowKey] = useState(false);

    return (
        <Box sx={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
            <Typography variant="h6">{title}</Typography>
            <Typography
                variant="body1"
                sx={{ wordWrap: 'break-word', marginBottom: '1rem', fontFamily: 'monospace' }}
            >
                {showKey ? keyValue : '•'.repeat(64)}
            </Typography>
            <Button
                variant="contained"
                onClick={() => setShowKey(!showKey)}
                sx={{ marginTop: '0.5rem' }}
            >
                {showKey ? 'Esconder' : 'Mostrar'}
            </Button>
        </Box>
    );
};

export default KeyDisplay;
