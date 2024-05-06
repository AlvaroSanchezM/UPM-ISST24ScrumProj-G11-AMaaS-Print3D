import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './css/Design.css';
import { Row, Col } from 'react-bootstrap';

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
    }, [currentUser]);

    const handlePrinterClick = (printer) => {
        navigate(`/printer-details/${printer.id}`, { state: { printer } });
    };

    return (
        <div className="design-container">
            <Row>
                <Col>
                    <div className="misimpresoras-header">
                        <h2>Diseña tus modelos</h2>
                    </div>
                    <div className="design-info">
                        <p>Selecciona una impresora para comenzar a diseñar tus modelos.</p>
                    </div>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4"> {/* Ajusta aquí para controlar cuántas tarjetas por fila */}
                {printers.map(printer => (
                    <Col key={printer.id} onClick={() => handlePrinterClick(printer)}>
                        <div className="printer-card">
                            <h3>{printer.model}</h3>
                            <img src={printer.imageUrl} alt={`Imagen de ${printer.model}`} style={{ width: '100px', height: '100px' }} />
                            <p><strong><u>Especificaciones:</u></strong></p>
                            <p><strong>Materiales:</strong> {printer.materials}</p>
                            <p><strong><u>Verificación:</u></strong> {printer.verification ? 'Verificada' : 'No verificada'}</p>
                            <p>Distancia: {/* Calcular y mostrar la distancia */}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Design;
