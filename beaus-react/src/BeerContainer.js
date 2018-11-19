import React, { Component } from 'react';
import PropTypes from 'prop-types'

import BeerImage from './beerImage'
import BeerText from './beerText'

import styles from './styling/beerContainer.module.css'


class BeerContainer extends Component {

  constructor(props){
  super(props)

    this.state = { 
      textIsVisible: false,
    }

  }

  showInfo = (e) => {
    e.preventDefault();
    this.props.passDataToParent(this.props.index);  
  }
 
  renderBeerText = () => {
    const { showBeerText } = this.props;

    if (showBeerText){
      return <BeerText {...this.props}  />
    }
  }

  render() {
   
    return (
      <div className={styles.beerContainer}>
        { this.renderBeerText() }
        <button className="" onClick={(e) => this.showInfo(e)}>
          <BeerImage {...this.props} textIsVisible={this.props.showBeerText} />
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