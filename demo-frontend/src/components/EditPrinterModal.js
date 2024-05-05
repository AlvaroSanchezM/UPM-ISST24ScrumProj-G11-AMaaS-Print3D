import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditPrinterModal = ({ show, handleClose, printerId, refreshPrinters }) => {
    const [printerData, setPrinterData] = useState({
        model: '',
        materials: '',
        maxWidth: '',
        maxLength: '',
        maxHeight: '',
        speed: '',
        materialCost: '',
        operationCost: '',
        latitude: '',
        longitude: '',
        verification: false
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (printerId) {
            axios.get(`/api/printers/${printerId}`, { withCredentials: true })
                .then(response => {
                    setPrinterData(response.data);
                })
                .catch(error => console.error("Error fetching printer details:", error));
        }
    }, [printerId, show]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setImageFile(e.target.files[0]);
        } else {
            setPrinterData({ ...printerData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('printer', JSON.stringify(printerData));

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.put(`/api/printers/${printerId}`, formData, {
                withCredentials: true
            });
            console.log('Update successful:', response.data);
            handleClose(); // Cierra el modal
            refreshPrinters(); // Actualiza la lista de impresoras
        } catch (error) {
            console.error("Error updating printer:", error.response ? error.response.data : error.message);
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
                    <Form.Label>Especificaciones:</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>Materiales</Form.Label>
                        <Form.Control type="text" name="materials" value={printerData.materials} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo Ancho (mm)</Form.Label>
                        <Form.Control type="number" name="maxWidth" value={printerData.maxWidth} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo Largo (mm)</Form.Label>
                        <Form.Control type="number" name="maxLength" value={printerData.maxLength} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Máximo Alto (mm)</Form.Label>
                        <Form.Control type="number" name="maxHeight" value={printerData.maxHeight} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Velocidad (mm/s)</Form.Label>
                        <Form.Control type="number" name="speed" value={printerData.speed} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Costo de Material ($)</Form.Label>
                        <Form.Control type="number" name="materialCost" value={printerData.materialCost} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Costo Operativo ($)</Form.Label>
                        <Form.Control type="number" name="operationCost" value={printerData.operationCost} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Latitud</Form.Label>
                        <Form.Control type="number" step="0.000001" name="latitude" value={printerData.latitude} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="number" step="0.000001" name="longitude" value={printerData.longitude} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Verificado</Form.Label>
                        <Form.Check type="checkbox" name="verification" checked={printerData.verification} onChange={e => setPrinterData({ ...printerData, verification: e.target.checked })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
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
