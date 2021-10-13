import React, { Component } from 'react'

const headerImage = "https://img.pngio.com/forest-silhouette-png-101-images-in-collection-page-2-forest-silhouette-png-1400_471.png"

class Header extends Component {


  render () {
    return (
      <div className="header-app">
        <img src={headerImage}
          alt=""
          className="image-header"/>
        <h1 className="logo-text">NATIONAL PARKS</h1>
      </div>
    )
  }
}

export default Header
