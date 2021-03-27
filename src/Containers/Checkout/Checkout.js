import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CheckoutSummary from './../../Components/Orders/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {


    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredient = {};
        // let price = 0;
        // for (let params of query.entries()) {
        //     if (params[0] === 'price') {
        //         price = params[1]

        //     } else {
        //         ingredient[params[0]] = +params[1]

        //     }
        // }
        // this.setState({
        //     ingredients: ingredient,
        //     totalPrice : price
        // })
    }
    checkoutCancelledHandler = () => {

        this.props.history.goBack();

    }

    checkoutContinuedHAndler = () => {

        this.props.history.push('/checkout/contact-data')

    }
    render() {

        let summary = <Redirect to='/' />
        if (this.props.ingts) {

            const purchasdRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (<div>
                {purchasdRedirect}
                <CheckoutSummary ingredients={this.props.ingts}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHAndler} />
                <Route path={this.props.match.path + "/contact-data"}
                    component={ContactData} />
            </div>

            );
        }
        return (
            <div>
                {summary}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingts: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);