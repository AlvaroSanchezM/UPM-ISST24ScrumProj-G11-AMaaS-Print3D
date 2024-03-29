import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import PrinterModel from './PrinterModel';
import AddPrinterModal from './AddPrinterModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditPrinterModal from './EditPrinterModal';

const MisImpresoras = () => {
    const [printers, setPrinters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPrinterId, setSelectedPrinterId] = useState(null);

    useEffect(() => {
        fetchPrinters();
    }, []);

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('/api/printers', { withCredentials: true });
            setPrinters(response.data);
        } catch (error) {
            console.error("Error fetching printers:", error);
        }
    };

    const handleDelete = async (printerId) => {
        if (printerId) {
            try {
                await axios.delete(`/api/printers/${printerId}`, { withCredentials: true });
                setShowDeleteModal(false); // Close the modal
                fetchPrinters(); // Refresh the list of printers
            } catch (error) {
                console.error("Error deleting printer:", error);
            }
        } else {
            console.error("Printer ID is undefined.");
        }
    };

    return (
        <div className="container mt-3">
            <h2>Mis Impresoras</h2>
            <Button onClick={() => setShowModal(true)}>Add New Printer</Button>
            {printers.map((printer) => (
                <div key={printer.id} className="mt-3 d-flex justify-content-between align-items-center">
                    <PrinterModel printer={printer} />
                    <div>
                        <Button variant="info" className="me-2" onClick={() => { setSelectedPrinterId(printer.id); setShowEditModal(true); }}>Edit</Button>
                        <Button variant="danger" onClick={() => { setSelectedPrinterId(printer.id); setShowDeleteModal(true); }}>Delete</Button>
                    </div>
                </div>
            ))}
            <AddPrinterModal show={showModal} handleClose={() => setShowModal(false)} refreshPrinters={fetchPrinters} />
            <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                printerId={selectedPrinterId}
                handleDelete={handleDelete}
                refreshPrinters={fetchPrinters}
            />
            <EditPrinterModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                printerId={selectedPrinterId}
                refreshPrinters={fetchPrinters}
            />
        </div>
    );
};

export default MisImpresoras;
