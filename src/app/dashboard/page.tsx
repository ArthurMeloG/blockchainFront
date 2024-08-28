"use client"

import React, {useEffect, useState} from 'react';
import { Box, Button, Container, Typography, Input } from '@mui/material';
import KeyDisplay from "@/app/dashboard/KeyDisplay";
import {useDashboardProntuario} from "@/app/DashboardProntuarioProvider";

const Page = () => {
    const { keys, setKeys } = useDashboardProntuario();
    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

    useEffect(() => {
        // Fetch PDFs when keys are available
        if (keys.publicKey && keys.privateKey) {
            fetchPdfs();
        }
    }, [keys]);

    const generateKeys = async () => {
        await fetch('http://localhost:8080/blocks/createKeyPair')
            .then((response) => response.json())
            .then((data) => {
                setKeys({ publicKey: data.publicKey, privateKey: data.privateKey });
            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
    };

    const fetchPdfs = async () => {
        const data = {
            privateKey: keys.privateKey,
            hash: "",
            base64Pdf: [],
            publicKey: keys.publicKey,
            owner: keys.privateKey
        };

        try {
            const response = await fetch('http://localhost:8080/blocks/findPdfByPk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API');
            }

            const result = await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleAddTransaction = async () => {
        if (!selectedFile) {
            alert('Por favor, selecione um arquivo PDF primeiro.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append('publicKey', keys.publicKey);
        formData.append('privateKey', keys.privateKey);
        formData.append('hash', ''); // Adjust accordingly if you have a hash value to send
        formData.append('owner', keys.privateKey); // Use the appropriate owner if needed

        try {
            const response = await fetch('http://localhost:8080/blocks/transaction', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar transação');
            }

            alert('Transação adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar transação:', error);
            alert('Erro ao adicionar transação.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '4rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Gerador de Chaves Públicas e Privadas
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={generateKeys}
                sx={{ marginBottom: '2rem' }}
            >
                Gerar Conjunto de Chaves
            </Button>

            {keys.publicKey && keys.privateKey && (
                <>
                    <KeyDisplay title="Chave Pública:" keyValue={keys.publicKey} />
                    <KeyDisplay title="Chave Privada:" keyValue={keys.privateKey} />

                    {/* New section to add transactions */}
                    <Box sx={{ marginTop: '4rem' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Adicionar Novo Prontuário
                        </Typography>
                        <Input
                            type="file"
                            inputProps={{ accept: '.pdf' }}
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTransaction}
                            sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                        >
                            Adicionar novo prontuário
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Page;
