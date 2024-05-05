import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const OrderDetailsModal = ({ show, handleClose, orderDetails }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orderDetails ? (
                    <>
                        <p>Name: {orderDetails.name}</p>
                        <p>Email: {orderDetails.email}</p>
                        <p>Dirección: {orderDetails.address}</p>
                        {/* Display other order details as needed */}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;
