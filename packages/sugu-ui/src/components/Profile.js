import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>is it on?</strong>
          <pre>{JSON.stringify(currentUser)}</pre>
        </h3>
      </header>      
    </div>
  );
};

export default Profile;