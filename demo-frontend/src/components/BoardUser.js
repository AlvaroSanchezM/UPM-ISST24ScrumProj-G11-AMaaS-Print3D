import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


const BoardUser = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setUserDetails(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setUserDetails({ error: _content });
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {userDetails.error ? (
          <div>Error: {userDetails.error}</div>
        ) : (
          <div>
            <h1>Welcome, {userDetails.username}!</h1>
            <p>Email: {userDetails.email}</p>
            {/* Render other user details as needed */}
            {/* <p>Home Directory: {userDetails.homeDirectory}</p> */}
          </div>
        )}
      </header>
    </div>
  );
};

export default BoardUser;
