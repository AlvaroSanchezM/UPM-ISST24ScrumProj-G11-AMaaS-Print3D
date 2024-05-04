import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import './css/Home.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDraftingCompass, faIndustry } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Print3D - Marketplace</h1>
                <p>"Esculpe tu imaginación, imprime tu visión."</p>
            </header>
            <div className="features">
                <div className="feature design">
                    <h2>Diseña</h2>
                    <FontAwesomeIcon icon={faDraftingCompass} size="3x" color="#6f42c1"/>
                    <p>Da vida a tus visiones con precisión y personalización.</p>
                    <p>En Print3D, tu archivo de diseño es el comienzo de una realidad tangible.</p>
                </div>
                <div className="feature manufacture">
                    <h2>Fabrica</h2>
                    <FontAwesomeIcon icon={faIndustry} size="3x" color="#007bff"/>
                    <p>Convierte capacidad ociosa en oportunidades de negocio.</p>
                    <p>Print3D es tu puente hacia una demanda en constante crecimiento de impresión 3D.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
