import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
        <nav>
          <div className="nav-logo">
            <img src={require('../images/cah-logo.png')} alt="main" className="logo-img" />
            <div>Cards against humanity</div>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Card List</Link>
            <Link to="/new" className="nav-link">New!</Link>
          </div>
        </nav>
    );
  }
}

export default Navbar;