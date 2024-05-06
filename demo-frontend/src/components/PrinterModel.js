import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/PrinterModel.css'; // Asegúrate de que los estilos están bien definidos aquí

const PrinterModel = ({ printer }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (printer?.id) {
            const fetchImageUrl = async () => {
                try {
                    const response = await axios.get(`/api/printers/${printer.id}/image-url`);
                    setImageUrl(response.data);
                } catch (error) {
                    console.error('Error fetching image URL', error);
                    setImageUrl('/path/to/default-image.jpg'); // URL de imagen de error o imagen por defecto
                }
            };
            fetchImageUrl();
        }
    }, [printer]);

    return (
        <div className="printer-model">
            <h2>{printer.model}</h2>
            <img src={imageUrl || '/path/to/default-placeholder.jpg'} alt={`Imagen de ${printer.model}`} className="printer-image" />
            <div className="printer-details">
                <p><strong>Propietario:</strong> {printer.propietary}</p>
                <p><strong>Especificaciones:</strong></p>
                <ul>
                    <li>Materiales: {printer.materials}</li>
                    <li>Dimensiones Máximas: {printer.maxWidth}x{printer.maxLength}x{printer.maxHeight} mm</li>
                    <li>Velocidad: {printer.speed} mm/s</li>
                    <li>Costo de Material: ${printer.materialCost}</li>
                    <li>Costo Operativo: ${printer.operationCost}</li>
                    <li>Ubicación: Latitud {printer.latitude}, Longitud {printer.longitude}</li>
                    <li>Verificado: {printer.verification ? 'Sí' : 'No'}</li>
                </ul>
            </div>
        </div>
    );
};

export default PrinterModel;
