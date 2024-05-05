// CreateOrder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth.service'; // Asegúrate de importar AuthService

const CreateOrder = () => {
    const { printerId } = useParams();
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [orderDetails, setOrderDetails] = useState({
        file: null,
        material: '',
        colorYAcabado: '',
        escala: '',
        cantidad: '',
        aceptadoPor: 'Hola', // Este valor se obtendrá de la impresora
        pedidoPor: currentUser.username, // Este valor se obtiene de currentUser
        pagoId: '',
    });

    // Suponiendo que tienes una función para obtener el propietario de la impresora


    const handleInputChange = (e) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setOrderDetails({ ...orderDetails, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(orderDetails).forEach(key => formData.append(key, orderDetails[key]));
        formData.append('printerId', printerId); // Asegúrate de que tu backend maneje esto correctamente

        try {
            const response = await axios.post('/api/pedidos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/success'); // Navegar a una vista de éxito después del pago
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange} required />
            <input type="text" name="material" placeholder="Material" value={orderDetails.material} onChange={handleInputChange} required />
            <input type="text" name="colorYAcabado" placeholder="Color y Acabado" value={orderDetails.colorYAcabado} onChange={handleInputChange} required />
            <input type="number" name="escala" placeholder="Escala" value={orderDetails.escala} onChange={handleInputChange} required />
            <input type="number" name="cantidad" placeholder="Cantidad" value={orderDetails.cantidad} onChange={handleInputChange} required />
            <input type="number" name="pagoId" placeholder="ID de Pago" value={orderDetails.pagoId} onChange={handleInputChange} required />
            <button type="submit">Pagar</button>
        </form>
    );
};

export default CreateOrder;
