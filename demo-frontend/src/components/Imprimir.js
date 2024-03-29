import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Dropdown } from 'react-bootstrap';

const Imprimir = () => {
    const [orders, setOrders] = useState([]);
    const [printers, setPrinters] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOrders();
        fetchPrinters();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/files/myuploads', { withCredentials: true });
            const unassignedOrders = response.data.filter(order => !order.printer);
            setOrders(unassignedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('/api/printers', { withCredentials: true });
            setPrinters(response.data);
        } catch (error) {
            console.error("Error fetching printers:", error);
        }
    };

    const handleAcceptOrder = async (printerId) => {
        try {
            await axios.put(`/api/files/${selectedOrder.id}/assignPrinter?printerId=${printerId}`, {}, { withCredentials: true });
            setSelectedOrder({ ...selectedOrder, printer: printerId }); // Update locally to reflect the assigned printer
            fetchOrders(); // Refresh orders to remove the accepted order from the list
        } catch (error) {
            console.error("Error accepting order:", error);
        }
    };

    const handleDownloadFile = async (orderId) => {
        try {
            const response = await axios.get(`/api/files/download/${orderId}`, { responseType: 'blob', withCredentials: true });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${selectedOrder.fileName}`); // Use the file name from the order details
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Imprimir Pedidos</h2>
            {orders.map((order, index) => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Pedido {index + 1}</h5>
                        <Button onClick={() => { setSelectedOrder(order); setShowModal(true); }}>More Info</Button>
                    </div>
                </div>
            ))}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            <p>Name: {selectedOrder.name}</p>
                            <p>Email: {selectedOrder.email}</p>
                            <p>Address: {selectedOrder.address}</p>
                            {/* Display other order details as needed */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select Printer
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {printers.map(printer => (
                                <Dropdown.Item key={printer.id} onClick={() => handleAcceptOrder(printer.id)}>
                                    {printer.model}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {selectedOrder && selectedOrder.printer && (
                        <Button variant="primary" onClick={() => handleDownloadFile(selectedOrder.id)}>Download File</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Imprimir;
