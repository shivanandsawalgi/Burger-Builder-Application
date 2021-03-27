import React, { Component } from 'react';
import Button from './../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from './../../../Components/UI/Spinner/Spinner';
import Input from './../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from './../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from './../../../store/actions/index';
import { updateObject, checkValidity } from './../../../Shared/utilityReducer'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                }, valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displyValue: 'Fastest' },
                        { value: 'cheapest', displyValue: 'Cheapect' }
                    ]
                },
                value: 'fastest',
                validation: {},

                valid: true,
                touched: false

            },
        },
        isFormValid: false
    }

    orderHandler = (event) => {

        event.preventDefault();


        let formData = {}

        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value
        }

        const order = {
            ingredients: this.props.ingts,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }

        this.props.onOrderBurger(order, this.props.token)

    }

    inputChangedHandler = (event, identifier) => {


        const updatedFormElement = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
            touched: true,

        })

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedFormElement
        })


        let isFormValid = true;


        for (let formIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[formIdentifier].valid && isFormValid

        }


        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid })
    }

    render() {


        const formElement = [];

        for (let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElement.map(formElement => {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        )
                    })
                }


                <Button btnType='Success' disabled={!this.state.isFormValid} >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingts: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));