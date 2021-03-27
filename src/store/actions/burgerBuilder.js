import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const addIngredient = (ingName)=>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingName

    }
}

export const removeIngredient = (ingName)=>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName

    }
}

const setIngredients = (ingredietsList) =>{
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredietsList

    }
}

const fetchIngredientsFailed =()=>{
    return{
        type : actionTypes.FETCH_INGREDIENTS_FAILED,

    }
}



export const initIngrediets = ()=>{
    return dispatch =>{

        axios.get('https://react-burger-builder-cdd4e-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
               dispatch(fetchIngredientsFailed())
               
            })
    }
}