import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import AuthService from "../services/auth.service";

const AddPrinterModal = ({ show, handleClose, refreshPrinters }) => {
    const [printerData, setPrinterData] = useState({
        model: '',
        materials: '',
        maxWidth: '',
        maxLength: '',
        maxHeight: '',
        speed: '',
        materialCost: '',
        operationCost: '',
        username: '', // Añade el campo username al estado inicial
        propietary: '' // Añade el campo propietary al estado inicial
    });
    const [imageFile, setImageFile] = useState(null);
    const [address, setAddress] = useState('');

    // Obtiene el usuario actualmente autenticado cuando el componente se monta
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setPrinterData(prevState => ({
                ...prevState,
                username: currentUser.username, // Asigna el username del usuario actual
                propietary: currentUser.username // Asigna el propietary con el username del usuario actual
            }));
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setImageFile(e.target.files[0]);
        } else if (e.target.name === 'address') {
            setAddress(e.target.value);
        } else {
            setPrinterData({ ...printerData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('printer', JSON.stringify(printerData));
        formData.append('address', address);

        try {
            await axios.post('/api/printers/add', formData, { withCredentials: true });
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
                    <Form.Label>Especificaciones</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>Materiales</Form.Label>
                        <Form.Control type="text" name="materials" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo ancho (cm)</Form.Label>
                        <Form.Control type="number" name="maxWidth" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo largo (cm)</Form.Label>
                        <Form.Control type="number" name="maxLength" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo alto (cm)</Form.Label>
                        <Form.Control type="number" name="maxHeight" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Velocidad (mm^3/hora)</Form.Label>
                        <Form.Control type="number" step="0.01" name="speed" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coste del material (€/cm^3)</Form.Label>
                        <Form.Control type="number" step="0.01" name="materialCost" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coste de operación (€/hora)</Form.Label>
                        <Form.Control type="number" step="0.01" name="operationCost" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="image" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" name="address" required onChange={handleChange} />
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
