import React, { Component } from "react";
import "./App.scss";
import "./Navbar.scss";
import "./Scroll.scss";
import "./Footer.scss";
import Parks from "./Parks";
import { Route, withRouter } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Scroll from "./Scroll";
import Footer from "./Footer";

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
        <CreateParks />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
