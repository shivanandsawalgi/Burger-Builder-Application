import React from 'react';
import styles from './Input.module.css'

const input = (props) => {

    let inputElement = null;
    let inputstyles = [styles.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputstyles.push(styles.Invalid)
    }
    switch (props.elementType) {

        case ('input'):
            inputElement = <input className={inputstyles.join(' ')} onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputstyles.join(' ')} onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select className={inputstyles.join(' ')} onChange={props.changed}
                    value={props.value} >
                    {props.elementConfig.options.map(option => {
                        return (<option key={option.value}>{option.displyValue}</option>)
                    })} </select>
            );
            break;
        default:
            inputElement = <input className={inputstyles.join(' ')} onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break;

    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input