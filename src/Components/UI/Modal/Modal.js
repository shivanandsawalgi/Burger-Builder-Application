import React, { Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop'
import Auxillary from '../../../HOC/Auxilary';

class Modal extends Component{

    shouldComponentUpdate=(nextProp, nextState)=>{
        return nextProp.showModal !== this.props.showModal || nextProp.children !== this.props.children;

    }
    render(){
        return(
            <Auxillary>
        <Backdrop show={this.props.showModal} clicked= {this.props.closeModal}></Backdrop>
        <div className={styles.Modal}
            style={{
                transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.showModal ? "1" : '0'
            }}>
            {this.props.children}

        </div>
    </Auxillary>
        )
    }
}


export default Modal;