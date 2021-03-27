import React, { Component } from 'react';
import Auxillary from '../../../HOC/Auxilary';
import Button from './../../../Components/UI/Button/Button'

class OrderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map((igKey) =>{
        return <li key={igKey} style={{textTransform : "capitalize"}}>
            <span>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>
    })
        return(
            <Auxillary>
            <h3>Your Order</h3>
            <p>Delicious burger with following ingredient</p>
            <ul>
                {ingredientSummary}

            </ul>
            <p><b>Total Price : {this.props.price.toFixed(2)}</b></p>
            <p>Continue to checkout</p>
            <Button clicked={this.props.purchaseCancelled} btnType={"Danger"}>CANCEL</Button>
            <Button  clicked={this.props.purchaseContinued} btnType={"Success"}>CONTINUE</Button>

        </Auxillary>

        )
    }
}


export default OrderSummary;