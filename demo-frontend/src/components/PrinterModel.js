import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrinterModel = ({ printer }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // Asegúrate de que estás usando printer.id para obtener la imagen
                const response = await axios.get(`/api/printers/${printer.id}/image`);
                console.log(response.data); // Verificar la cadena Base64 en la consola
                setImageUrl(`data:image/jpeg;base64,${response.data}`);
            } catch (error) {
                console.error('Error fetching image', error);
            }
        };

        if (printer && printer.id) {
            fetchImage();
        }
    }, [printer]); // Dependencia en el objeto completo puede ser menos eficiente si el objeto cambia a menudo

    return (
        <div>
            <h3>{printer.model}</h3>
            <img src={imageUrl} alt={printer.model} />
        </div>
    );
};

export default PrinterModel;
