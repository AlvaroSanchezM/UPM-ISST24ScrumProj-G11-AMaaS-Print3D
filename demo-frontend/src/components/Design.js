import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Design.css';


const Design = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState({ name: '', email: '', address: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePayment = () => {
        // Navigate to the Pagos component, passing the form data and file
        navigate('/payment', { state: { data, file } });
    };

    return (
        <div className="design-form-container">
            <header className="design-header">
            <h2>Inicia tu impresión 3D</h2>
            </header>
            <form>
                <label>Nombre:</label>
                <input type="text" name="name" value={data.name} onChange={handleInputChange} />

                <label>Email:</label>
                <input type="email" name="email" value={data.email} onChange={handleInputChange} />

                <label>Dirección:</label>
                <input type="text" name="address" value={data.address} onChange={handleInputChange} />

                <label>Archivo:</label>
                <input type="file" onChange={handleFileChange} />

                <button type="button" onClick={handlePayment}>Pagar</button>
            </form>
        </div>
    );
};

export default Design;