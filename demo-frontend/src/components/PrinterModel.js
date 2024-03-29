// PrinterModel.js
import React from 'react';

const PrinterModel = ({ printer }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{printer.model}</h5>
                <p className="card-text">Specifications: {printer.specifications}</p>
                <p className="card-text">Materials: {printer.materials}</p>
                {/* Add more fields as necessary */}
            </div>
        </div>
    );
};

export default PrinterModel;
