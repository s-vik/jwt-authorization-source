import React from "react";
import style from "../../hoc/formControls/formControls.module.css";
import LoginReduxForm from "./LoginForm";
import RegistrationReduxForm from "./RegistrationForm";

const Public = ({
  error,
  regError,
  className,
  handleClick,
  active,
  reg,
  onSubmit,
}) => (
  <>
    <div className={style.loginForm} onClick={handleClick}>
      <label
        className={active === "Authorization" ? className : style.tab}
        title="Authorization"
      >
        Authorization
      </label>
      <label
        className={active === "Registration" ? className : style.tab}
        title="Registration"
      >
        Registration
      </label>
    </div>
    {!reg ? (
      <div>
        <LoginReduxForm errorMessage={error} onSubmit={onSubmit} />
      </div>
    ) : (
      <div>
        <RegistrationReduxForm errorMessage={regError} onSubmit={onSubmit} />
      </div>
    )}
  </>
);

export default Public;
