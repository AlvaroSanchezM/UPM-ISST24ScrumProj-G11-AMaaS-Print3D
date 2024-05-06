import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth.service';
import "./css/OrderForm.css"; // Asegúrate de que los estilos están bien definidos aquí

const CreateOrder = () => {
    const { printerId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const printer = location.state?.printer;
    const currentUser = AuthService.getCurrentUser();

    const [orderDetails, setOrderDetails] = useState({
        file: null,
        material: '',
        colorYAcabado: '',
        escala: '',
        cantidad: '',
        aceptadoPor: printer?.username || '',
        pedidoPor: currentUser.username,
        pagoId: '',
    });

    useEffect(() => {
        const fetchMaxPagoId = async () => {
            try {
                const response = await axios.get('/api/pedidos/maxPagoId');
                const maxPagoId = response.data;
                setOrderDetails(prevState => ({
                    ...prevState,
                    pagoId: (maxPagoId + 1).toString(),
                }));
            } catch (error) {
                console.error('Error al obtener el pagoId más alto:', error);
            }
        };
        fetchMaxPagoId();
    }, []);

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
        formData.append('printerId', printerId);

        try {
            const response = await axios.post('/api/pedidos/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/success');
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    };

    return (
        <div className="order-form-container">
            <form onSubmit={handleSubmit} className="order-form">
                <input type="file" name="file" onChange={handleFileChange} required />
                <input type="text" name="material" placeholder="Material" value={orderDetails.material} onChange={handleInputChange} required />
                <input type="text" name="colorYAcabado" placeholder="Color y Acabado" value={orderDetails.colorYAcabado} onChange={handleInputChange} required />
                <input type="number" name="escala" placeholder="Escala" value={orderDetails.escala} onChange={handleInputChange} required />
                <input type="number" name="cantidad" placeholder="Cantidad" value={orderDetails.cantidad} onChange={handleInputChange} required />
                <p className="total-price">Precio total: 150€</p>
                <button type="submit" className="submit-button">Pagar</button>
            </form>
        </div>
    );
};

export default CreateOrder;
