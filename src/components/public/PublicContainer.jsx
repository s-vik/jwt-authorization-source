import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login, signUp, me } from "../../redux/auth-reducer";
import style from "../../hoc/formControls/formControls.module.css";
import classNames from "classnames/bind";
import Public from "./Public";
import Preloader from "./../Preloader/Preloader";

let cx = classNames.bind(style);

const PublicContainer = ({
  isAuth,
  error,
  login,
  signUp,
  me,
  regError,
  isFetching,
}) => {
  const [active, setActive] = useState("Authorization");
  const [reg, setReg] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (isAuth) {
      history.push("/private");
    } else if (localStorage.getItem("access_token")) {
      me();
    }
  }, [isAuth, history, me]);
  const onSubmit = ({ login: userLogin, password }) => {
    if (active === "Registration") {
      signUp(userLogin, password);
    } else if (active === "Authorization") {
      login(userLogin, password);
    }
  };
  const handleClick = (e) => {
    setActive(e.target.title);
    if (e.target.title === "Registration") {
      setReg(true);
    } else {
      setReg(false);
    }
  };
  let className = cx("tab", { active: true });
  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : (
        <Public
          error={error}
          regError={regError}
          className={className}
          handleClick={handleClick}
          active={active}
          reg={reg}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuth,
  error: auth.error,
  regError: auth.regError,
  isFetching: auth.isFetching,
});

export default connect(mapStateToProps, { login, signUp, me })(PublicContainer);
