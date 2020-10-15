import React from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "./Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = (props) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!isAuthenticated && (
          <FontAwesomeIcon
            icon={faSignInAlt}
            className="signout"
            onClick={loginWithRedirect}
          />
        )}
        {isAuthenticated && (
          <div className="profile-area">
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
      {/* <LoginButton />
      <LogoutButton /> */}
      <Profile />
    </nav>
  );
};

export default withRouter(NavBar);
