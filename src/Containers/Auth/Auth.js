import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Input from './../../Components/UI/Input/Input'
import Button from './../../Components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from './../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from './../../Components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from './../../Shared/utilityReducer';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true

    }

    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true

            })
        })

        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)

    }

    switchAuthmodeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
    }
    render() {

        const formElement = [];

        for (let key in this.state.controls) {
            formElement.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElement.map(singleFormElement => {
            return <Input
                key={singleFormElement.id}
                elementType={singleFormElement.config.elementType}
                elementConfig={singleFormElement.config.elementConfig}
                value={singleFormElement.config.value}
                invalid={!singleFormElement.config.valid}
                shouldValidate={singleFormElement.config.validation}
                touched={singleFormElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, singleFormElement.id)}
            />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>

        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthmodeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : "SIGNUP"}</Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => { dispatch(actions.auth(email, password, isSignUp)) },
        onSetAuthRedirectPath: () => { dispatch(actions.setAuthRedirectPath('/')) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);