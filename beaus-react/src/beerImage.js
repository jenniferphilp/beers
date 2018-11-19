import React, { Fragment } from 'react';
import styles from './styling/images.module.css'
import classnames from 'classnames'

import beausLogo from './beaus-black-logo.svg'

const BeerImage = (props) => {
    let imageContainerClass = classnames({ [styles.hideImage]: props.textIsVisible, [styles.showImage]: !props.textIsVisible });
    return (
        <div className={imageContainerClass}>
            { props.src && <img className="" src={props.src} alt={props.alt}/>}
            { !props.src && 
                <Fragment>
                    <img className={styles.staticLogo} src={beausLogo} alt="Beaus black and white logo"/>
                    <p className="">Image Not Available</p>
                </Fragment>
            }
        </div>
    )
}

export default BeerImage;