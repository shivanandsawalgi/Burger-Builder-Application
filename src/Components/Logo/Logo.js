import React from 'react';
import burgerLogo from './../../Assets/Images/burger-logo.png';
import styles from './Logo.module.css';

const logo = (props)=>{
    return(
        <div className={styles.Logo}
        >
            <img src={burgerLogo} alt="burgerImage"
            />
        </div>
    )

}

export default logo;