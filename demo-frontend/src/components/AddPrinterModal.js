import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddPrinterModal = ({ show, handleClose, refreshPrinters }) => {
    const [printerData, setPrinterData] = useState({
        model: '',
        specifications: '',
        materials: '',
    });

    const handleChange = (e) => {
        setPrinterData({ ...printerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/printers/add', printerData, { withCredentials: true });
            handleClose(); // Close the modal
            refreshPrinters(); // Refresh the list of printers
        } catch (error) {
            console.error("Error adding printer:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir nueva impresora</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="model" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type="text" name="specifications" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Materiales</Form.Label>
                        <Form.Control type="text" name="materials" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo ancho</Form.Label>
                        <Form.Control type="number" name="max_width" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo largo</Form.Label>
                        <Form.Control type="number" name="max_length" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo alto</Form.Label>
                        <Form.Control type="number" name="max_height" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Velocidad</Form.Label>
                        <Form.Control type="number" step="0.01" name="speed" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coste del material</Form.Label>
                        <Form.Control type="number" step="0.01" name="material_cost" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coste de operación</Form.Label>
                        <Form.Control type="number" step="0.01" name="operation_cost" required onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Añadir impresora
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPrinterModal;
