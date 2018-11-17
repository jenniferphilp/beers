import React, { Component } from 'react';
import PropTypes from 'prop-types'

import BeerImage from './beerImage'
import BeerText from './beerText'



class BeerContainer extends Component {

  constructor(props){
  super(props)

    this.state = { 
      textIsVisible: false
    }
  }

  showInfo = (e) => {
    e.preventDefault();
  
    this.setState({
      textIsVisible: !this.state.textIsVisible
    })
  }
 
  render() {
    return (
      <div>
      { this.state.textIsVisible && <BeerText {...this.props} />}
        <button onClick={(e) => this.showInfo(e)}>
          <BeerImage {...this.props} textIsVisible={this.state.textIsVisible} />
        </button>
      </div>
    );
  }
}

export default BeerContainer;

BeerContainer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}