import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './css/Design.css';
import { Row, Col } from 'react-bootstrap';
import PrinterModel from './PrinterModel';

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
                        <h3>Selecciona una impresora para comenzar a diseñar tus modelos.</h3>
                    </div>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4"> {/* Ajusta aquí para controlar cuántas tarjetas por fila */}
                {printers.map(printer => (
                    <Col key={printer.id} onClick={() => handlePrinterClick(printer)}>
                        <div className="printer-card">
                            <PrinterModel printer={printer} />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Design;
