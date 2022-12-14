import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me, gettingCart, gettingUsers } from "./store";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Users from "./components/Users"
import ProductsAdmin from "./components/ProductsAdmin"
import Checkout from "./components/Checkout"

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    if (this.props.isAdmin){
      this.props.usersLoader()
    }
    const { isLoggedIn, isAdmin } = this.props;
    if(isLoggedIn){
      this.props.cartLoader(this.props.user);
    }

    return (
      <div>
        <div>
          <Navbar />
        </div>
        {isLoggedIn ? (
          <div>
            {isAdmin ? (
              <Switch>
                <Route path="/users" component={Users}/>
                <Route path="/products" component={ProductsAdmin}/>
                <Route path="/home" component={Home} />
                <Route path="/shoppingCart" component={Cart} />
                <Route exact path="/products/:id" component={Details} />
                <Route path="/checkout" component={Checkout} />
              </Switch>) : (<Switch>
                <Route path="/home" component={Home} />
                <Route path="/shoppingCart" component={Cart} />
                <Route exact path="/products/:id" component={Details} />
                <Route path="/checkout" component={Checkout} />
              </Switch>)
            }
          </div>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/shoppingCart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products/:id" component={Details} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    cartLoader: (user) => dispatch(gettingCart(user)),
    usersLoader: () => dispatch(gettingUsers())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
