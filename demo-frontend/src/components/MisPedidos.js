import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MisPedidos() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get('/api/files/myuploads', { withCredentials: true });
                setUploads(response.data);
            } catch (error) {
                console.error("Error fetching uploads:", error);
            }
        };

        fetchUploads();
    }, []);

    return (
        <div className="container mt-3">
            <h2 className="mb-4">Mis Pedidos</h2>
            {uploads.length > 0 ? (
                uploads.map((upload, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{upload.name}</h5>
                            <p className="card-text">Email: {upload.email}</p>
                            <p className="card-text">Address: {upload.address}</p>
                            {/* Include other fields as needed */}
                            <button className="btn btn-primary" onClick={() => alert('Showing more info...')}>View Details</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No uploads found.</p>
            )}
        </div>
    );
}
