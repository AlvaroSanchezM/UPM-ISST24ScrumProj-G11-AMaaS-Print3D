import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import PrinterModel from './PrinterModel';
import AddPrinterModal from './AddPrinterModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditPrinterModal from './EditPrinterModal';

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
        if (printerId) {
            try {
                await axios.delete(`/api/printers/${printerId}`, { withCredentials: true });
                setShowDeleteModal(false);
                fetchPrinters();
            } catch (error) {
                console.error("Error deleting printer:", error);
                setError('Error deleting printer. Please try again later.');
            }
        } else {
            console.error("Printer ID is undefined.");
            setError('Error: Printer ID is undefined.');
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <h2>Mis Impresoras</h2>
                    <Button onClick={() => setShowModal(true)}>Añadir nueva impresora</Button>
                </Col>
            </Row>
            {error && (
                <Row>
                    <Col>
                        <Alert variant="danger" className="mt-3">{error}</Alert>
                    </Col>
                </Row>
            )}
            <Row xs={1} md={2} className="g-4">
                {printers.map((printer) => (
                    <Col key={printer.id}>
                        <Card className="card-square">
                            <Card.Body>
                                <PrinterModel printer={printer} />
                                <div className="mt-2 d-flex justify-content-end">
                                    <Button variant="info" className="me-2" onClick={() => { setSelectedPrinterId(printer.id); setShowEditModal(true); }}>Editar</Button>
                                    <Button variant="danger" onClick={() => { setSelectedPrinterId(printer.id); setShowDeleteModal(true); }}>Eliminar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <AddPrinterModal show={showModal} handleClose={() => setShowModal(false)} refreshPrinters={fetchPrinters} />
            <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                printerId={selectedPrinterId}
                handleDelete={handleDelete}
            />
            <EditPrinterModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                printerId={selectedPrinterId}
                refreshPrinters={fetchPrinters}
            />
        </Container>
    );
};

export default MisImpresoras;