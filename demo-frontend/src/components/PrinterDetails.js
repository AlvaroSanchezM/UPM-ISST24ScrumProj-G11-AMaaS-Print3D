import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './css/PrinterDetails.css'; // Asegúrate de que los estilos están bien definidos aquí

const PrinterDetails = () => {
    const { printerId } = useParams();
    const navigate = useNavigate();
    const [printer, setPrinter] = useState(null);

    useEffect(() => {
        const fetchPrinterDetails = async () => {
            const response = await axios.get(`/api/printers/${printerId}`);
            setPrinter(response.data);
        };

        fetchPrinterDetails();
    }, [printerId]);

    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    const defaultCenter = {
        lat: printer?.latitude || 0,
        lng: printer?.longitude || 0
    };

    const handleCreateOrderClick = () => {
        navigate(`/create-order/${printerId}`, { state: { printer } });
    };

    return (
        <div className="printer-details-container">
            {printer ? (
                <>
                    <h2>Esta impresora se encuentra en:</h2>
                    <div className="map-container">
                        <LoadScript googleMapsApiKey="AIzaSyA7s1147GX_tuFwDCrD5Z_YXKbYl13L6t0">
                            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                                <Marker position={defaultCenter} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <button className="create-order-button" onClick={handleCreateOrderClick}>Crear Pedido</button>
                </>
            ) : (
                <p>Loading printer details...</p>
            )}
        </div>
    );
};

export default PrinterDetails;
