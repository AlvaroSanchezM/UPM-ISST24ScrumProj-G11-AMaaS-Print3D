import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, printerId, handleDelete }) => {
    const onDelete = () => {
        handleDelete(printerId);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Borrar impresora</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro que deseas borrar esta impresora?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={onDelete}>Borrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;