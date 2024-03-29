import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './css/Design.css'; // Assuming you have a CSS file for styling

const Design = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [uploadStatus, setUploadStatus] = useState(''); // New state variable for upload status
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);

        try {
            const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File and data uploaded successfully:', response.data);
            setUploadStatus('success');
        } catch (error) {
            console.error('Error uploading file and data:', error);
            setUploadStatus('error');
        }
    };






    const handleMoreInfoClick = () => {
        navigate('/more-info'); // Navigate to the more info page
    };

    return (
        <div className="design-form-container">
            {uploadStatus === '' && (
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={data.name} onChange={handleInputChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={data.email} onChange={handleInputChange} />

                    <label>Address:</label>
                    <input type="text" name="address" value={data.address} onChange={handleInputChange} />

                    <label>File:</label>
                    <input type="file" onChange={handleFileChange} />

                    <button type="submit">Submit</button>
                </form>
            )}
            {uploadStatus === 'success' && (
                <div>
                    <p>File uploaded successfully!</p>
                    <button onClick={handleMoreInfoClick}>Ver más información de tu pedido</button>
                </div>
            )}
            {uploadStatus === 'error' && (
                <p>Error uploading file and data!</p>
            )}
        </div>
    );
};

export default Design;
