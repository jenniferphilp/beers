import React, { Component } from 'react';
import PropTypes from 'prop-types'

import styles from './styling/text.module.css'

class BeerText extends Component {

  constructor(props){
  super(props)


  }
 

  //if textIsVisible true, add class that positions absolutely over the image below
  render() {
    const { name, style, tertiary_category, tasting_note, alcohol_content, textIsVisible } = this.props;
    
    
    return (
        <div className={styles.textContainer}>
            <h4>{name}</h4>
            <p>{style}</p>
            <p>{tertiary_category}</p>
            <p>{tasting_note}</p>
            <p>Alcohol Content: {alcohol_content/100}%</p>
            <button type="button" className="">Click for locations</button> 
        </div>
    );

  }
}

export default BeerText;

// BeerText.propTypes = {
//   src: PropTypes.string,
//   alt: PropTypes.string
// }