import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Dropdown } from 'react-bootstrap';

const Imprimir = () => {
    const [unassignedOrders, setUnassignedOrders] = useState([]);
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [printers, setPrinters] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    useEffect(() => {
        fetchOrders();
        fetchPrinters();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/files/myuploads', { withCredentials: true });
            const allOrders = response.data;
            setUnassignedOrders(allOrders.filter(order => !order.printer));
            setAssignedOrders(allOrders.filter(order => order.printer));
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
            setShowDownloadButton(true); // Show download button after assigning a printer
            fetchOrders(); // Refresh orders to update the lists
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
            link.setAttribute('download', `${selectedOrder.fileName}`); // Use the original file name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
        // Only show the download button in the modal for orders that have a printer assigned
        setShowDownloadButton(!!order.printer);
    };

    return (
        <div className="container mt-3">
            <h2>Imprimir Pedidos</h2>
            <h3>Unassigned Orders</h3>
            {unassignedOrders.map((order, index) => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Pedido {index + 1}</h5>
                        <Button onClick={() => handleShowModal(order)}>More Info</Button>
                    </div>
                </div>
            ))}
            <h3>Assigned Orders</h3>
            {assignedOrders.map((order, index) => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Pedido {index + 1} (Assigned)</h5>
                        <Button variant="primary" onClick={() => handleDownloadFile(order.id)}>Download File</Button>
                        <Button onClick={() => handleShowModal(order)}>More Info</Button>
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
                    {selectedOrder && !selectedOrder.printer && (
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
                    )}
                    {showDownloadButton && (
                        <Button variant="primary" onClick={() => handleDownloadFile(selectedOrder.id)}>Download File</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Imprimir;
