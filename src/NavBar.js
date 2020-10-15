import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = (props) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!isAuthenticated && (
          <div className="signin-area">
            <label className="nickname signin" onClick={loginWithRedirect}>
              Sign In
            </label>
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="signout"
              onClick={loginWithRedirect}
            />
          </div>
        )}
        {isAuthenticated && (
          <div className="profile-area">
            <img
              src={user.picture}
              alt={user.nickname}
              className="profile-image"
            />
            <label className="nickname">{user.nickname}</label>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              onClick={() => logout({ returnTo: window.location.href })}
              className="signout"
            />
          </div>
        )}
      </div>
      <div className="gradient"></div>
    </nav>
  );
};

export default withRouter(NavBar);
