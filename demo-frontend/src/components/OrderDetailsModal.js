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
                        <p>Material: {orderDetails.material}</p>
                        <p>Color y Acabado: {orderDetails.colorYAcabado}</p>
                        <p>Escala: {orderDetails.escala}</p>
                        <p>Cantidad: {orderDetails.cantidad}</p>
                        <p>Aceptado por: {orderDetails.aceptadoPor}</p>
                        <p>Pedido por: {orderDetails.pedidoPor}</p>
                        <p>Pago ID: {orderDetails.pagoId}</p>
                        <p>Tipo de archivo: {orderDetails.fileType}</p>
                        {/* Aquí puedes agregar más detalles según sea necesario */}
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;
