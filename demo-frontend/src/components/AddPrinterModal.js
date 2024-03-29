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
                <Modal.Title>Add New Printer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="model" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Specifications</Form.Label>
                        <Form.Control type="text" name="specifications" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Materials</Form.Label>
                        <Form.Control type="text" name="materials" required onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Printer
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPrinterModal;
