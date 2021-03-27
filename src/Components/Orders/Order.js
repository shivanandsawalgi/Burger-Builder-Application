import React from 'react';
import styles from './Order.module.css'

const order = (props) => {
    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            ammount: props.ingredients[ingredient]
        })
    }

    let ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block', border: '1px solid black', padding : '0 5px',
            margin: '0 8px'
        }}>{ig.name + ' '} ({ig.ammount})</span>
    })
    return (
        <div className={styles.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price :</p><strong>USD {props.price.toFixed(2)}</strong>
        </div>
    )
};

export default order