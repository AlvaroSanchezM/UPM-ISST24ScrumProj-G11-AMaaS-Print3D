import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditPrinterModal = ({ show, handleClose, printerId, refreshPrinters }) => {
    const [printerData, setPrinterData] = useState({
        model: '',
        specifications: '',
        materials: '',
    });

    useEffect(() => {
        if (printerId) {
            axios.get(`/api/printers/${printerId}`, { withCredentials: true })
                .then(response => {
                    setPrinterData({
                        model: response.data.model,
                        specifications: response.data.specifications,
                        materials: response.data.materials,
                    });
                })
                .catch(error => console.error("Error fetching printer details:", error));
        }
    }, [printerId, show]);

    const handleChange = (e) => {
        setPrinterData({ ...printerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/printers/${printerId}`, printerData, { withCredentials: true });
            handleClose();
            refreshPrinters();
        } catch (error) {
            console.error("Error updating printer:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Impresora</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type="text" name="model" value={printerData.model} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type="text" name="specifications" value={printerData.specifications} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Materiales</Form.Label>
                        <Form.Control type="text" name="materials" value={printerData.materials} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Guardar Cambios</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPrinterModal;
