// PrinterDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

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
        <div>
            {printer && (
                <>
                    <h2>{printer.propietary} - {printer.model}</h2>
                    <LoadScript googleMapsApiKey="AIzaSyA7s1147GX_tuFwDCrD5Z_YXKbYl13L6t0">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                            <Marker position={defaultCenter} />
                        </GoogleMap>
                    </LoadScript>
                    <button onClick={handleCreateOrderClick}>Crear Pedido</button>
                </>
            )}
        </div>
    );
};

export default PrinterDetails;
