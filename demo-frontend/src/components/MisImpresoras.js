import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import PrinterModel from './PrinterModel';
import AddPrinterModal from './AddPrinterModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditPrinterModal from './EditPrinterModal';
import "./css/MisImpresoras.css"; // Asegúrate de que los estilos están bien definidos aquí

const MisImpresoras = () => {
    const [printers, setPrinters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPrinterId, setSelectedPrinterId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPrinters();
    }, []);

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('/api/printers', { withCredentials: true });
            setPrinters(response.data);
        } catch (error) {
            console.error("Error fetching printers:", error);
            setError('Error fetching printers. Please try again later.');
        }
    };

    const handleDelete = async (printerId) => {
        try {
            await axios.delete(`/api/printers/${printerId}`, { withCredentials: true });
            setShowDeleteModal(false);
            fetchPrinters(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting printer:", error);
            setError('Error deleting printer. Please try again later.');
        }
    };

    return (
        <div className="printer-container">
            <Row>
                <Col>
                    <div className="misimpresoras-header">
                        <h2>Mis Impresoras</h2>
                        <Button onClick={() => setShowModal(true)} className="add-button">Añadir nueva impresora</Button>
                    </div>
                </Col>
            </Row>
            {error && (
                <Alert variant="danger" className="mt-7">{error}</Alert>
            )}
            <Row xs={1} md={2} lg={3} > {/* Ajustado para manejar tres columnas en pantallas grandes */}
                {printers.map((printer) => (
                    <div key={printer.id}>
                        <Card className="printer-card">

                            <PrinterModel printer={printer} />
                            <div className="button-group">
                                <Button variant="info" onClick={() => { setSelectedPrinterId(printer.id); setShowEditModal(true); }}>Editar</Button>
                                <Button variant="danger" onClick={() => { setSelectedPrinterId(printer.id); setShowDeleteModal(true); }}>Eliminar</Button>
                            </div>

                        </Card>
                    </div>
                ))}
            </Row>
            <AddPrinterModal show={showModal} handleClose={() => setShowModal(false)} refreshPrinters={fetchPrinters} />
            <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleDelete={() => handleDelete(selectedPrinterId)} />
            <EditPrinterModal show={showEditModal} handleClose={() => setShowEditModal(false)} printerId={selectedPrinterId} refreshPrinters={fetchPrinters} />
        </div>
    );
};

export default MisImpresoras;
