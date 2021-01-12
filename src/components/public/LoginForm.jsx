import React from "react";
import { reduxForm, Field } from "redux-form";
import { required } from "../../helpers/validators/validators";
import { renderField } from "../../hoc/formControls/FormControls";
import style from "../../hoc/formControls/formControls.module.css";

const renderInput = renderField("input");

const LoginForm = ({ handleSubmit, errorMessage, anyTouched }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        validate={[required]}
        component={renderInput}
        placeholder="Login"
        name="login"
      />
    </div>
    <div>
      <Field
        validate={[required]}
        component={renderInput}
        placeholder="Password"
        name="password"
        type="password"
      />
    </div>
    {errorMessage &&  (
      <div className={errorMessage && style.loginError}>{errorMessage}</div>
    )}
    <div>
      <button className={style.submit_button}>Login</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
