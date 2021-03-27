import React from 'react';
import styles from './Toolbar.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems'

const toolbar = (props)=>{
    return(
        <header className={styles.Toolbar}>
            <div onClick={props.clicked}>MENU</div>
            <div className={styles.Logo}>
                <Logo></Logo>
                </div>
            <nav className={styles.DesktopOnly}>
            <NavigationItems isAuthenticated ={props.isAuth}></NavigationItems>
            </nav>
        </header>
    )
} 
export default toolbar
;