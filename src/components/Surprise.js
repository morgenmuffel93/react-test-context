import React, { Component } from 'react';
import {withRouter} from 'react-router'

class Surprise extends Component {
  render() {
    return (
      <div className="bouquet-container">
        <div>What's new:</div>
        <img src={require('../images/new_bouquet.jpg')} alt=""/>
      </div>
    );
  }
}
export default withRouter(Surprise)