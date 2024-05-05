import React, { useState } from 'react';
import PrinterList from './PrinterList'; // Asegúrate de que este componente está correctamente importado
import PrinterDetails from './PrinterDetails'; // Asegúrate de que este componente está correctamente importado
import OrderForm from './OrderForm'; // Asegúrate de que este componente está correctamente importado

const Imprimir = () => {
    const [selectedPrinterId, setSelectedPrinterId] = useState(null);
    const [isOrdering, setIsOrdering] = useState(false);

    const handleSelectPrinter = (printerId) => {
        setSelectedPrinterId(printerId);
        setIsOrdering(false); // Resetear el estado de orden para mostrar detalles de la impresora
    };

    const handleStartOrder = () => {
        setIsOrdering(true); // Cambiar a la vista de formulario de pedido
    };

    return (
        <div>
            {!selectedPrinterId && (
                <PrinterList onSelectPrinter={handleSelectPrinter} />
            )}
            {selectedPrinterId && !isOrdering && (
                <div>
                    <PrinterDetails printerId={selectedPrinterId} />
                    <button onClick={handleStartOrder}>Comenzar Pedido</button>
                </div>
            )}
            {isOrdering && (
                <OrderForm printerId={selectedPrinterId} />
            )}
        </div>
    );
};

export default Imprimir;
