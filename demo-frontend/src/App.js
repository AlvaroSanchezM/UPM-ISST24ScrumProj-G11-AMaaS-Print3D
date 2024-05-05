import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Design from "./components/Design";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./components/Payment";
import MisPedidos from "./components/MisPedidos";

import EventBus from "./common/EventBus";
import MisImpresoras from "./components/MisImpresoras";
import Imprimir from "./components/Imprimir";
import PrinterDetails from "./components/PrinterDetails";
import CreateOrder from "./components/CreateOrder";
import Success from "./components/Success";
import Footer from './components/Footer';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link to={"/home"} className="navbar-brand">
          Print3d
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <React.Fragment>
              <li className="nav-item">
                <Link to={"/disena"} className="nav-link">
                  Diseña
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/misimpresoras"} className="nav-link">
                  Mis Impresoras
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/imprimir"} className="nav-link">
                  Imprimir
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/mispedidos"} className="nav-link">
                  Mis Pedidos
                </Link>
              </li>
            </React.Fragment>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/disena" element={<PrivateRoute><Design /></PrivateRoute>} />
          <Route path="/misimpresoras" element={<PrivateRoute><MisImpresoras /></PrivateRoute>} />
          <Route path="/imprimir" element={<PrivateRoute><Imprimir /></PrivateRoute>} />
          <Route path="/mispedidos" element={<PrivateRoute><MisPedidos /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/printer-details/:printerId" element={<PrivateRoute><PrinterDetails /></PrivateRoute>} />
          <Route path="/create-order/:printerId" element={<PrivateRoute><CreateOrder /></PrivateRoute>} />
          <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
        </Routes>
        <Footer/>
      </div>


    </div>
  );
};

export default App;
