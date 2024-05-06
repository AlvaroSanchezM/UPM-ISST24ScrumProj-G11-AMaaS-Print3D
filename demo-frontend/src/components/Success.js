import React from 'react';
import { Card } from 'react-bootstrap';
import "./css/Success.css"; // Asegúrate de que los estilos están bien definidos aquí

const Success = () => {
    return (
        <div className="success-container">
            <Card className="text-center success-card">
                <Card.Header as="h5">¡Éxito!</Card.Header>
                <Card className="success-icon">
                    <Card.Body>
                        <Card.Title>Pago completado con éxito</Card.Title>
                        <Card.Text>
                            Tu pedido ha sido procesado y está en camino. Gracias por tu compra.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Card>
        </div>
    );
};

export default Success;
