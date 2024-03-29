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
            <form>
                <label>Name:</label>
                <input type="text" name="name" value={data.name} onChange={handleInputChange} />

                <label>Email:</label>
                <input type="email" name="email" value={data.email} onChange={handleInputChange} />

                <label>Address:</label>
                <input type="text" name="address" value={data.address} onChange={handleInputChange} />

                <label>File:</label>
                <input type="file" onChange={handleFileChange} />

                <button type="button" onClick={handlePayment}>Pay</button>
            </form>
        </div>
    );
};

export default Design;
