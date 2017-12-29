import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/**
 * Ensure the user is authenticated before they can view this route
 *
 * @class ProtectedRoute
 * @extends {React.Component}
 */
class ProtectedRoute extends React.Component {
  render() {
    const { isAuthenticated, component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(["session", "isAuthenticated"], false)
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
