import './App.css';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComoonet from './HOC/asyncComponent/asyncComponet'


const asyncCheckout = asyncComoonet(() => {
  return import('./Containers/Checkout/Checkout');
})

const asyncOrders = asyncComoonet(() => {
  return import('./Containers/Checkout/Orders/Orders');
})

const asyncAuth = asyncComoonet(() => {
  return import('./Containers/Auth/Auth');
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route exact path='/' component={BurgerBuilder} />
        <Redirect to='/'></Redirect>
      </Switch>

    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route exact path='/' component={BurgerBuilder} />
          <Redirect to='/'></Redirect>

        </Switch>

      )
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => { dispatch(actions.authCheckState()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
