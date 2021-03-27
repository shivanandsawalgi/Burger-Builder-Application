import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'


const data = [
    {label : "Salad", type : "salad"},
    {label : "Cheese", type : "cheese"},
    {label : "Meat", type : "meat"},
    {label : "Becon", type : "becon"}
]

const buildCOntrols = (props)=>(
    <div className={styles.BuildControls}>
        <p><b>Total Price : {props.price.toFixed(2)}</b></p>
        {
            data.map((sinlgeData =>{
                return <BuildControl 
                label={sinlgeData.label} 
                key = {sinlgeData.type}
                added = {() => props.ingredientAdded(sinlgeData.type)}
                removed = {()=> props.ingredientRemoved(sinlgeData.type)}
                disabled = {props.disableInfo[sinlgeData.type]}></BuildControl>
            }))
        }
        <button className={styles.OrderButton} disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ?  "ORDER NOW" : "SIGNUP TO ORDER"}</button>
    </div>
);

export default buildCOntrols