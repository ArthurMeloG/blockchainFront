"use client"
import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography } from '@mui/material';

const KeysPage = () => {
    const [showPublicKey, setShowPublicKey] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);

    const publicKey = "your-public-key-here";
    const secretKey = "your-secret-key-here";

    return (
        <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
            {/* Public Key Card */}
            <Card sx={{ marginBottom: '1rem' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Public Key
                    </Typography>
                    {showPublicKey ? (
                        <Typography variant="body1">{publicKey}</Typography>
                    ) : (
                        <Typography variant="body1">******</Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowPublicKey(!showPublicKey)}
                        sx={{ marginTop: '1rem' }}
                    >
                        {showPublicKey ? "Hide" : "Show"} Public Key
                    </Button>
                </CardContent>
            </Card>

            {/* Secret Key Card */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Secret Key
                    </Typography>
                    {showSecretKey ? (
                        <Typography variant="body1">{secretKey}</Typography>
                    ) : (
                        <Typography variant="body1">******</Typography>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        sx={{ marginTop: '1rem' }}
                    >
                        {showSecretKey ? "Hide" : "Show"} Secret Key
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default KeysPage;