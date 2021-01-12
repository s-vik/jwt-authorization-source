import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuth,
});

export const withAuthRedirect = (WrappedComponent) =>
  connect(mapStateToProps)((props) => {
    if (props.isAuth) {
      return <WrappedComponent {...props} />;
    }
    return <Redirect to="/public" />;
  });
