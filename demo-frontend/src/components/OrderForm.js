import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ printerId }) => {
    const [orderDetails, setOrderDetails] = useState({
        material: '',
        colorYAcabado: '',
        escala: '',
        cantidad: ''
    });

    const handleChange = (e) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/pedidos/upload', {
                ...orderDetails,
                printerId
            });
            console.log('Pedido creado:', data);
        } catch (error) {
            console.error('Error creando el pedido:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="material" value={orderDetails.material} onChange={handleChange} placeholder="Material" />
            <input name="colorYAcabado" value={orderDetails.colorYAcabado} onChange={handleChange} placeholder="Color y Acabado" />
            <input type="number" name="escala" value={orderDetails.escala} onChange={handleChange} placeholder="Escala" />
            <input type="number" name="cantidad" value={orderDetails.cantidad} onChange={handleChange} placeholder="Cantidad" />
            <button type="submit">Hacer Pedido</button>
        </form>
    );
};

export default OrderForm;
