"use client"
import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography // Importação adicionada
} from '@mui/material';
import { useDashboardProntuario } from "@/app/DashboardProntuarioProvider";

const Page = () => {
    const { keys, setKeys } = useDashboardProntuario();
    const [pdfs, setPdfs] = useState([]);

    const fetchPdfs = async () => {
        const data = {
            privateKey: keys.privateKey,
            hash: "",
            base64Pdf: [],
            publicKey: keys.publicKey,
            owner: keys.publicKey
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
            console.log(result)
            setPdfs(result);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    return (
        <Container maxWidth="md" sx={{ marginTop: '4rem' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hash do PDF</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pdfs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        Você não possui PDFs registrados
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            pdfs.map((pdf) => (
                                <TableRow key={pdf.hash}>
                                    <TableCell>{pdf.hash}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            // href={pdf.url}
                                            download
                                            onClick={() => {}}
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Page;
