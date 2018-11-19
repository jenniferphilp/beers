import React, { Component } from 'react';
import PropTypes from 'prop-types'

import styles from './styling/text.module.css'

class BeerText extends Component {

  // componentDidMount = () => {
  //   this.props.passDataToParent(this.props.textIsVisible);
  // }

  render() {
    const { name, index, style, tertiary_category, tasting_note, alcohol_content } = this.props;

    return (
        <div className={styles.textContainer}>
            <h4>{name}</h4>
            <p>{style}</p>
            <p>{index}</p>
            <p>{tertiary_category}</p>
            <p className={styles.description}>{tasting_note}</p>
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