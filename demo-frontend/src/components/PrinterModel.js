import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/PrinterModel.css'; // Asumiendo que los estilos están definidos en este archivo CSS

const PrinterModel = ({ printer }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axios.get(`/api/printers/${printer.id}/image-url`);
                setImageUrl(response.data);
            } catch (error) {
                console.error('Error fetching image URL', error);
                setImageUrl(''); // Puedes poner aquí una URL de imagen de error si lo prefieres
            }
        };

        if (printer && printer.id) {
            fetchImageUrl();
        }
    }, [printer]);

    return (
        <div>
            <h2>{printer.model}</h2>
            <img src={imageUrl} alt={printer.model} className="printer-image" />
            <div className="printer-details">
                <p><strong><u>Propietario:</u></strong> {printer.propietary}</p>
                <p><strong><u>Especificaciones:</u></strong></p>
                <p><strong>Materiales:</strong> {printer.materials}</p>
                <p><strong>Dimensiones Máximas:</strong> {printer.maxWidth}x{printer.maxLength}x{printer.maxHeight} mm</p>
                <p><strong>Velocidad:</strong> {printer.speed} mm/s</p>
                <p><strong>Costo de Material:</strong> ${printer.materialCost}</p>
                <p><strong>Costo Operativo:</strong> ${printer.operationCost}</p>
                <p><strong><u>Ubicación:</u></strong> Latitud {printer.latitude}, Longitud {printer.longitude}</p>
                <p><strong><u>Verificado:</u></strong> {printer.verification ? 'Sí' : 'No'}</p>
            </div>
        </div>
    );
};

export default PrinterModel;
