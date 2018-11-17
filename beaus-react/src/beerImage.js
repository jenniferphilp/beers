import React, { Fragment } from 'react';
import styles from './styling/images.module.css'
import classnames from 'classnames'

import beausLogo from './beaus-black-logo.svg'

const BeerImage = (props) => {
    let image = classnames({ [styles.hideImage]: props.textIsVisible });
    return (
        <div className="">
            { props.src && <img className={image} src={props.src} alt={props.alt}/>}
            { !props.src && 
                <Fragment>
                    <img className={image} src={beausLogo} alt="Beaus black and white logo"/>
                    <p className="">Image Not Available</p>
                </Fragment>
            }
        </div>
    )
}

export default BeerImage;