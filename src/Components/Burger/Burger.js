import React from "react";
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngrediants/BurgerIngredients';

const burger = (props) => {

    let updatedIngredient = Object.keys(props.ingredients)
        .map((igKey) => {

            return [...Array(props.ingredients[igKey])].map((_, i) => {

                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
            
        }).reduce((arr, el)=>{
            return arr.concat(el)
        }, [])

        if(updatedIngredient.length === 0){
            updatedIngredient = "Please add ingredients"
        }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            {updatedIngredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;