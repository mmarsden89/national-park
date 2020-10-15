import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const appJsx = (
  <BrowserRouter>
    <Auth0Provider
      domain="dev-0r9j-iz3.auth0.com"
      clientId="1HbLQ6nRcscQnN2UY5i79et3CRBQq3zQ"
      redirectUri={window.location.href}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

ReactDOM.render(appJsx, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Auth0Provider } from "@auth0/auth0-react";

// ReactDOM.render(
//   <Auth0Provider
//     domain="dev-0r9j-iz3.auth0.com"
//     clientId="1HbLQ6nRcscQnN2UY5i79et3CRBQq3zQ"
//     redirectUri={window.location.origin}
//   >
//     <App />
//   </Auth0Provider>,
//   document.getElementById("root")
// );
