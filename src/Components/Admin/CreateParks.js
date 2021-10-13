import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
const parksData = require('../parks.json')

class CreateParks extends Component {
  constructor (props) {
    super(props)

  this.state = {
    parks: []
  }
}

  async componentDidMount () {
    const response = await axios(`${apiUrl}/parks`)
    this.setState({ parks: response.data.parks })
  }

  updateParks = () => {
    const { parks } = this.state
    for (let i =  0; i < this.state.parks.length; i++) {
      if (parks[i].name === parksData[i].Name) {
        axios({
          url: apiUrl + '/parks/' + parks[i]._id,
          method: 'PATCH',
          data: {
            park: {
              thumbnail: parksData[i].Thumbnail
            }
          }
        })
      }
    }
  }

  sendParks() {
    parksData.forEach(park => {
      axios({
        url: apiUrl + '/parks',
        method: 'POST',
        data: {
          park: {
            name: park.Name,
            image: park.Image,
            thumbnail: park.Thumbnail,
            location: park.Location,
            established: park.Established,
            area: park.Area,
            rec_visitors: park['Recreation visitors'],
            description: park.Description
          }
        }
      })
    })
  }


  render () {
    return (
      <div>
        <button onClick={this.sendParks}>Send Park</button>
      </div>
    )
  }
}

export default CreateParks
