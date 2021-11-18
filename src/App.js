import React, { Component } from "react";
import "./App.scss";
import { Route, withRouter } from "react-router-dom";
import { Header, Footer, NavBar, Scroll, Parks } from "./Components/index.js";

// Admin
import CreateParks from "./Admin/CreateParks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Scroll />
        <div className="App-body">
          <Header />
          <Parks />
        </div>
        {/* <CreateParks /> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
