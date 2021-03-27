import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Auxillary from '../../HOC/Auxilary';
import Burger from './../../Components/Burger/Burger';
import Modal from './../../Components/UI/Modal/Modal';
import OrderSummary from './../../Components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../Components/UI/Spinner/Spinner';
import withErrorHandler from './../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from './../../store/actions/index'


const INGREDIENT_PRICE = {
    salad: 2,
    meat: 4,
    cheese: 0.7,
    becon: 0.8

}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,

        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
        // axios.get('https://react-burger-builder-cdd4e-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: true
        //         }

        //         )
        //     })
    }

    updatePurchaseState = (ingredients) => {

        let ingredient = { ...ingredients };

        let sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey]

            })
            .reduce((sum, el) => {
                return sum + el

            }, 0);

        return sum > 0
    }



    addIngredientHandler = (type) => {
        const oldingredientCount = this.props.ingts[type];
        const newIngredientCount = oldingredientCount + 1;

        const newIngredients = { ...this.props.ingts };
        newIngredients[type] = newIngredientCount;

        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + INGREDIENT_PRICE[type];

        this.setState({
            totalPrice: newTotalPrice,
            ingredients: newIngredients
        })

        this.updatePurchaseState(newIngredients)

    }

    removeIngredientHandler = (type) => {
        const oldingredientCount = this.props.ingts[type];
        if (oldingredientCount <= 0) {
            return;
        }
        const newIngredientCount = oldingredientCount - 1;

        const newIngredients = { ...this.props.ingts };
        newIngredients[type] = newIngredientCount;

        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENT_PRICE[type];

        this.setState({
            totalPrice: newTotalPrice,
            ingredients: newIngredients
        })
        this.updatePurchaseState(newIngredients)

    }

    parchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    closeMOdalHandler = () => {
        this.setState({
            purchasing: false
        })

    }
    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render() {
        let ingredientsCopy = { ...this.props.ingts };

        Object.keys(ingredientsCopy).map((key) => {
           return ingredientsCopy[key] = ingredientsCopy[key] <= 0
        })

        let orderSummary = null;


        let burger = this.props.error ? <p><center>Ingredients Cant Be Loaded</center></p> : <Spinner />

        if (this.props.ingts) {
            burger = <Auxillary>
                <Burger ingredients={this.props.ingts} />
                <BuildControls
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disableInfo={ingredientsCopy}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ingts)}
                    ordered={this.parchaseHandler}
                    isAuth={this.props.isAuthenticated} />

            </Auxillary>

            orderSummary = <OrderSummary
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                price={this.props.price}
                ingredients={this.props.ingts}></OrderSummary>
        }


        return (
            <Auxillary>

                <Modal showModal={this.state.purchasing} closeModal={this.closeMOdalHandler}>
                    {
                        orderSummary
                    }
                </Modal>
                {
                    burger
                }

            </Auxillary >
        )
    }
}

const mapStateToProps = state => {
    return {
        ingts: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingt) => { dispatch(burgerBuilderActions.addIngredient(ingt)) },
        removeIngredient: (ingt) => { dispatch(burgerBuilderActions.removeIngredient(ingt)) },
        onInitIngredients: () => { dispatch(burgerBuilderActions.initIngrediets()) },
        onInitPurchase: () => { dispatch(burgerBuilderActions.purchaseInit()) },
        onSetAuthRedirectPath : (path) => { dispatch(burgerBuilderActions.setAuthRedirectPath(path))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));