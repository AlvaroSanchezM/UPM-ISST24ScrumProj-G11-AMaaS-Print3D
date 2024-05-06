import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetailsModal from './OrderDetailsModal';
import './css/MisPedidos.css';

export default function MisPedidos() {
    const [uploads, setUploads] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get('/api/pedidos/myuploads', { withCredentials: true });
                setUploads(response.data);
            } catch (error) {
                console.error("Error fetching uploads:", error);
            }
        };

        fetchUploads();
    }, []);

    const handleViewDetails = async (orderId) => {
        try {
            const response = await axios.get(`/api/pedidos/${orderId}`, { withCredentials: true });
            setSelectedOrderDetails(response.data);
            setShowDetailsModal(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    return (
        <div className="printer-container">
            <h2 className="mb-4">Mis Pedidos</h2>
            {uploads.length > 0 ? (
                uploads.map((upload, index) => (
                    <div key={index} className="card mb-3 card-mis-pedidos">
                        <div className="card-body">
                            <h5 className="card-title">Pedido {index + 1}</h5>
                            <button className="btn btn-primary" onClick={() => handleViewDetails(upload.id)}>Más información</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No se encontraron pedidos.</p>
            )}
            <OrderDetailsModal
                show={showDetailsModal}
                handleClose={() => setShowDetailsModal(false)}
                orderDetails={selectedOrderDetails}
            />
        </div>
    );
}
