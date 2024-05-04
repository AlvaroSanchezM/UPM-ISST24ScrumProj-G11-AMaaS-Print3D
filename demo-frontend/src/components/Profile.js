import React from "react";
import AuthService from "../services/auth.service";
import "./css/Profile.css"; // Importa el archivo CSS para estilos

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h3>{currentUser.username} Profile</h3>
      </header>
      <div className="profile-info">
        <p><strong>Id:</strong> {currentUser.id}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <div>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
