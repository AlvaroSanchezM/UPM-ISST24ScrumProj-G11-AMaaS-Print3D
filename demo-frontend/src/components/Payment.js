// Pagos.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, file } = location.state; // Retrieve the passed data and file
    const [uploadStatus, setUploadStatus] = useState('');
    axios.defaults.withCredentials = true;

    const handlePaymentAndUpload = async () => {
        // Simulate a payment success
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);

        try {
            const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadStatus('success');
        } catch (error) {
            setUploadStatus('error');
        }
    };

    return (
        <div>
            <h2>Payment Page</h2>
            <button onClick={handlePaymentAndUpload}>Complete Payment and Upload</button>
            {uploadStatus === 'success' && <p>File uploaded successfully!</p>}
            {uploadStatus === 'error' && <p>Error uploading file and data.</p>}
        </div>
    );
};

export default Payment;
