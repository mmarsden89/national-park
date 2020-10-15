import React, { Component } from "react";
import axios from "axios";
import apiUrl from "./apiConfig";

class SinglePark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      park: {},
    };
  }

  async componentDidMount() {
    const response = await axios(`${apiUrl}/parks/${this.props.target}`);
    this.setState({ park: response.data.park });
  }

  render() {
    const { park } = this.state;
    return (
      <div className="park-modal">
        <div className="single-park-flex">
          <div className="park-image-container">
            <img
              src={park.image}
              alt="temp"
              className="modal-image"
              loading="lazy"
            />
          </div>
          <div className="park-info">
            <h3 className="modal-header">{park.name}</h3>
            <h6 className="modal-sub-header">
              <i>{park.location}</i>
            </h6>
            <div className="modal-resp">
              <p className="info thirty-padding-top est">
                <b>Established: </b>
                {park.established}
              </p>
              <p className="info area">
                <b>Area: </b>
                {park.area}
              </p>
              <p className="info vis">
                <b>Total Visitors: </b>
                {park.rec_visitors}
              </p>
            </div>
            <p className="modal-park-desc">{park.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePark;
