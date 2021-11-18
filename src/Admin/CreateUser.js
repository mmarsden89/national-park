import React, { Component } from "react";
import axios from "axios";
import apiUrl from "../apiConfig";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {}

  async createUser() {
    await axios({
      url: apiUrl + "/users",
      method: "POST",
      data: {
        user: {
          // nickname: auth0Client.getProfile().nickname
        },
      },
    });
  }

  async deleteUser() {
    await axios({
      // url: `${apiUrl}/users/${auth0Client.getProfile().nickname}`,
      method: "DELETE",
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.deleteUser}>Create User</button>
      </div>
    );
  }
}

export default CreateUser;
