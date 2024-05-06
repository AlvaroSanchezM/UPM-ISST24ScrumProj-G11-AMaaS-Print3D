import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './css/Imprimir.css';

const Imprimir = () => {
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/pedidos/myprinters/orders');
            const allOrders = response.data;
            setAssignedOrders(allOrders.filter(order => !order.terminado));
            setCompletedOrders(allOrders.filter(order => order.terminado));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleCompleteOrder = async () => {
        try {
            await axios.put(`/api/pedidos/${selectedOrder.id}/complete`, {}, { withCredentials: true });
            fetchOrders();
            setShowModal(false);
        } catch (error) {
            console.error("Error completing order:", error);
        }
    };

    const handleDownloadFile = async () => {
        const response = await axios.get(`/api/pedidos/download/${selectedOrder.id}`, { responseType: 'blob', withCredentials: true });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `pedido_${selectedOrder.id}.${selectedOrder.fileType}`);
        document.body.appendChild(link);
        link.click();
    };

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <div className="container mt-9">
            <h2>Imprimir Pedidos</h2>
            <h3>Pedidos Sin Completar</h3>
            {assignedOrders.map((order, index) => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Pedido {index + 1}</h5>
                        <Button variant="primary" onClick={() => handleShowModal(order)}>Más Info</Button>
                    </div>
                </div>
            ))}
            <h3>Pedidos Completados</h3>
            {completedOrders.map((order, index) => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Pedido Completado {index + 1}</h5>
                        <Button variant="primary" onClick={() => handleShowModal(order)}>Más Info</Button>
                    </div>
                </div>
            ))}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            <p>Material: {selectedOrder.material}</p>
                            <p>Color y Acabado: {selectedOrder.colorYAcabado}</p>
                            <p>Escala: {selectedOrder.escala}</p>
                            <p>Cantidad: {selectedOrder.cantidad}</p>
                            <p>Aceptado por: {selectedOrder.aceptadoPor}</p>
                            <p>Pedido por: {selectedOrder.pedidoPor}</p>
                            <p>Pago ID: {selectedOrder.pagoId}</p>
                            <p>Tipo de archivo: {selectedOrder.fileType}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCompleteOrder}>Pedido Completado</Button>
                    <Button variant="primary" onClick={handleDownloadFile}>Descargar archivo</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Imprimir;
