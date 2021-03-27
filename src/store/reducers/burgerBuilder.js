import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../../Shared/utilityReducer'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building : false
}

const INGREDIENT_PRICE = {
    salad: 2,
    meat: 4,
    cheese: 0.7,
    becon: 0.8

}

const addIngredients = (state, action) => {
    const updatedIngrediet = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngrediets = updateObject(state.ingredients, updatedIngrediet);
    const updatedState = {
        ingredients: updatedIngrediets,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedState);
}

const removeIngredients = (state, action) => {
    const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredietss = updateObject(state.ingredients, updatedIngr);
    const updatedStatee = {
        ingredients: updatedIngredietss,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedStatee);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building : false
    })

}

const fetchIngredietsFailed = (state, action) => {
    return updateObject(state, { error: true })

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: fetchIngredietsFailed(state, action)
        break

        default: {
            return state
        }
    }
}

export default reducer