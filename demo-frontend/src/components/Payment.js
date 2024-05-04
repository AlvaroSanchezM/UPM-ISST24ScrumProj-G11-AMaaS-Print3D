// Pagos.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './css/Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, file } = location.state;
    const [uploadStatus, setUploadStatus] = useState('');
    axios.defaults.withCredentials = true;

    const handlePaymentAndUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);

        try {
            await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadStatus('success');
        } catch (error) {
            setUploadStatus('error');
        }
    };

    return (
        <div className="container">
            <h2>Payment Page</h2>
            <button onClick={handlePaymentAndUpload}>Complete Payment and Upload</button>
            {uploadStatus === 'success' && <p>File uploaded successfully!</p>}
            {uploadStatus === 'error' && <p className="error">Error uploading file and data.</p>}
        </div>
    );
};

export default Payment;