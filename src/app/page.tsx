"use client"

import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import {useDashboardProntuario} from "@/app/DashboardProntuarioProvider";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { keys, setKeys } = useDashboardProntuario();


    // Function to handle user registration
    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setSuccessMessage(`User registered successfully: ${user.email}`);
            setErrorMessage('');
            router.push('/dashboard');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    // Function to handle user login
    const handleLogin = async () => {
            await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })  .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setSuccessMessage(`Logged in successfully. Public Key: ${data}`);
                    setErrorMessage('');
                    setKeys({ publicKey: data, privateKey: "" })
                    router.push('/dashboard');
                }).catch( () => {
                    setErrorMessage('Invalid credentials or user not found.');
                    setSuccessMessage('');
                })
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left Side - Form and Text */}
            <Box
                sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    bgcolor: 'white',
                }}
            >
                <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    BlockMed
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '80%' }}>
                    BlockMed é a solução inovadora que utiliza a tecnologia de blockchain para garantir a segurança,
                    integridade e privacidade dos prontuários eletrônicos. Com o BlockMed, os registros médicos
                    são armazenados de forma distribuída e imutável, protegendo os dados contra acessos não autorizados
                    e garantindo que as informações sejam mantidas de forma segura e confiável.
                </Typography>

                {/* Form Fields */}
                <TextField
                    label="Email address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Error and Success Messages */}
                {errorMessage && <Alert severity="error" sx={{ marginBottom: '1rem' }}>{errorMessage}</Alert>}
                {successMessage && <Alert severity="success" sx={{ marginBottom: '1rem' }}>{successMessage}</Alert>}

                {/* Buttons for Login and Signup */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginBottom: '1rem' }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                >
                    Sign up
                </Button>
            </Box>

            {/* Right Side - Background Image */}
            <Box
                sx={{
                    width: '50%',
                    bgcolor: 'linear-gradient(135deg, rgba(63,81,181,1) 0%, rgba(255,64,129,1) 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{
                    width: '80%',
                    height: '80%',
                    backgroundImage: 'url(/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} />
            </Box>
        </Box>
    );
};

export default LoginPage;
