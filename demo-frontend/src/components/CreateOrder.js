import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth.service'; // Asegúrate de importar AuthService
import "./css/OrderForm.css";

const CreateOrder = () => {
    const { printerId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const printer = location.state?.printer; // Accede al objeto printer pasado como estado de navegación
    const currentUser = AuthService.getCurrentUser();

    // Inicializa el estado de orderDetails con el valor de printer.username para aceptadoPor
    const [orderDetails, setOrderDetails] = useState({
        file: null,
        material: '',
        colorYAcabado: '',
        escala: '',
        cantidad: '',
        aceptadoPor: printer?.username || '', // Este valor se obtiene de la impresora
        pedidoPor: currentUser.username, // Este valor se obtiene de currentUser
        pagoId: '', // Inicializa pagoId como una cadena vacía
    });

    // Función para obtener el pagoId más alto y sumarle 1
    const fetchMaxPagoId = async () => {
        try {
            const response = await axios.get('/api/pedidos/maxPagoId');
            const maxPagoId = response.data;
            setOrderDetails(prevState => ({
                ...prevState,
                pagoId: (maxPagoId + 1).toString(), // Suma 1 y convierte a cadena
            }));
        } catch (error) {
            console.error('Error al obtener el pagoId más alto:', error);
        }
    };

    // Llama a fetchMaxPagoId cuando el componente se monta
    useEffect(() => {
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
        <div className= "class-4">
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange} required />
            <input type="text" name="material" placeholder="Material" value={orderDetails.material} onChange={handleInputChange} required />
            <input type="text" name="colorYAcabado" placeholder="Color y Acabado" value={orderDetails.colorYAcabado} onChange={handleInputChange} required />
            <input type="number" name="escala" placeholder="Escala" value={orderDetails.escala} onChange={handleInputChange} required />
            <input type="number" name="cantidad" placeholder="Cantidad" value={orderDetails.cantidad} onChange={handleInputChange} required />
            <button type="submit">Pagar</button>
        </form>
        </div>
    );
};

export default CreateOrder;
