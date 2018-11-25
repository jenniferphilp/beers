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

  componentDidUpdate = (prevProps) => {
    //if a beer is selected, state.text changes from false to true
    //it will remain in the true state unless it is selected again (only toggling changes state)
    //but ... we are forcing the false state by only showing one beer at a time (logic in App.js)
    //need a conditional to set textIsVisible to false if beerIsSelected changes from true to false        
    if (prevProps.beerIsSelected && !this.props.beerIsSelected) {
            this.setState({
            textIsVisible: false
          })
    }
  }  

  toggleText = (e) => {
    e.preventDefault();

    this.setState({
      textIsVisible: !this.state.textIsVisible
    })

    this.props.passDataToParent(this.props.index);  
  }
 
  renderBeerText = () => {
    if (this.props.beerIsSelected && this.state.textIsVisible){
      return <BeerText {...this.props}  />
    }
  }

  render() {
    return (
      <div className={styles.beerContainer}>
        { this.renderBeerText() }
        <button className="" onClick={(e) => this.toggleText(e)}>
          <BeerImage {...this.props} textIsVisible={this.props.beerIsSelected && this.state.textIsVisible} />
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