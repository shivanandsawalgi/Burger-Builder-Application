import React, { Component } from 'react';
import Auxillary from "../Auxilary";
import styles from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
// import SideDrawer from './../../Components/Navigation/NavigationItems/SideDrawer/SideDrawer'
import SideDrawer from '../../Components/Navigation/NavigationItems/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSideDrawer: false
        }
    }
    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })

    }

    openSideDrawer = () => {
        this.setState({
            showSideDrawer: true
        })

    }

    render() {
        return (
            <Auxillary >
                <div className={styles.Content}>Toolbar, Side Drawer, Backdrop</div>

                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    clicked={this.openSideDrawer} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main>
                    {this.props.children}
                </main>
            </Auxillary>

        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);

