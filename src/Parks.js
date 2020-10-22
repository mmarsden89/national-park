import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePark from "./SinglePark";
import apiUrl from "./apiConfig";
import { useAuth0 } from "@auth0/auth0-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const Parks = (props) => {
  const [parks, setParks] = useState([]);
  const [filter, setFilter] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [userState, setUserState] = useState({ list: [] });
  const [userParkList, setUserParkList] = useState([]);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const getParks = async () => {
    const parkResponse = await axios(`${apiUrl}/parks`);
    setParks(parkResponse.data.parks);
    setFilter(parkResponse.data.parks);
  };

  const getUser = async () => {
    if (isAuthenticated) {
      try {
        const userResponse = await axios(`${apiUrl}/users/${user.nickname}`);
        setUserState(userResponse.data.user);
        setUserParkList(userResponse.data.user.list);
      } catch (err) {
        await createUser();
        await getUser();
      }
    }
  };

  useEffect(() => {
    getParks();
    getUser();
  }, [user]);

  const createUser = async () => {
    await axios({
      url: apiUrl + "/users",
      method: "POST",
      data: {
        user: {
          nickname: user.nickname,
        },
      },
    });
  };

  const openModal = (event) => {
    setModal(!modal);
    setSelectedTarget(event.currentTarget.id);
  };

  const closeModal = () => {
    if (modal) {
      setModal(false);
    }
  };

  const addPark = async (id) => {
    let updated = [...userParkList];
    setUserParkList((userParkList) => [...userParkList, id]);
    updated.push(id);
    return updated;
  };

  const handleVisit = async (event) => {
    const id = event.currentTarget.id;
    await axios({
      url: apiUrl + `/users/${user.nickname}`,
      method: "PATCH",
      data: {
        user: {
          list: await addPark(id),
        },
      },
    });
  };

  const removePark = async (id) => {
    let updated = [...userParkList].filter((item) => item !== id);
    setUserParkList(userParkList.filter((item) => item !== id));
    return updated;
  };

  const handleRemoveVisit = async (event) => {
    const id = event.currentTarget.id;
    await axios({
      url: apiUrl + `/users/${user.nickname}`,
      method: "PATCH",
      data: {
        user: {
          list: await removePark(id),
        },
      },
    });
  };

  const visited = () => {
    const updated = parks.filter((park) => {
      return userParkList.includes(park._id);
    });
    setFilter(updated);
  };

  const notVisited = () => {
    const updated = parks.filter((park) => {
      return !userParkList.includes(park._id);
    });
    setFilter(updated);
  };

  const all = () => {
    setFilter(parks);
  };

  const { list } = userState;
  const filler = <div className="filler"></div>;
  const buttonsHTML = (
    <div className="filter-buttons-div">
      <button onClick={all} className="filter-buttons">
        All
      </button>
      <button onClick={visited} className="filter-buttons">
        Visted
      </button>
      <button onClick={notVisited} className="filter-buttons">
        Not-Visited
      </button>
    </div>
  );
  const parksHTML = filter.map((park) => (
    <div key={`${park._id}-park`} id={`${park._id}-div`} className="parks">
      {isAuthenticated ? (
        userParkList.includes(park._id) ? (
          <button onClick={handleRemoveVisit} id={park._id}>
            <FontAwesomeIcon icon={faMinusCircle} className="plusOrMinus" />
          </button>
        ) : (
          <button onClick={handleVisit} id={park._id}>
            <FontAwesomeIcon icon={faPlusCircle} className="plusOrMinus" />
          </button>
        )
      ) : null}
      <div className="park-container" onClick={openModal} id={park._id}>
        <div className="mob-img">
          <img
            src={park.thumbnail}
            alt={"thumbnail of " + park.name}
            className="park-thumbnail"
            loading="lazy"
          />
        </div>
        <div className="info-grid">
          <p className="park-name">{park.name} National Park</p>
          <p className="info">
            {" "}
            <b>Location:</b> {park.location} <b>Founded:</b> {park.established}
          </p>
          <p className="info">
            {" "}
            <b>Total Area:</b> {park.area} <b>Total Visitors:</b>{" "}
            {park.rec_visitors}
          </p>
          <p className="info desc">{park.description}</p>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container" onClick={closeModal}>
      {isAuthenticated ? buttonsHTML : filler}
      {parksHTML}
      {modal ? <SinglePark target={selectedTarget} /> : null}
    </div>
  );
};

export default Parks;
