// Design.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './css/Design.css';


const Design = () => {
    const [printers, setPrinters] = useState([]);
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const response = await axios.get('/api/printers/nearby', {
                    params: {
                        latitude: currentUser.latitude,
                        longitude: currentUser.longitude,
                    },
                });
                setPrinters(response.data);
            } catch (error) {
                console.error('Error fetching printers:', error);
            }
        };

        fetchPrinters();
    }, [currentUser]); // Dependencia en currentUser para reflejar cambios en la ubicación

    const handlePrinterClick = (printer) => {
        navigate(`/printer-details/${printer.id}`, { state: { printer } });
    };

    return (
        <div>
            {printers.map(printer => (
                <div key={printer.id} onClick={() => handlePrinterClick(printer)}>
                    <h3>{printer.propietary} - {printer.model}</h3>
                    <img src={printer.imageUrl} alt={`Imagen de ${printer.model}`} style={{ width: '100px', height: '100px' }} />
                    <p><strong><u>Especificaciones:</u></strong></p>
                    <p><strong>Materiales:</strong> {printer.materials}</p>
                    <p><strong><u>Verificación:</u></strong> {printer.verification ? 'Verificada' : 'No verificada'}</p>
                    <p>Distancia: {/* Calcular y mostrar la distancia */}</p>
                </div>
            ))}
        </div>
    );
};

export default Design;
