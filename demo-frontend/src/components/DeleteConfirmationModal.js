import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, printerId, handleDelete, refreshPrinters }) => {
    const onDelete = async () => {
        await handleDelete(printerId);
        refreshPrinters();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Printer</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this printer?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
