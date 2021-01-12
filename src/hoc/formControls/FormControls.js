import React from "react";
import style from "./formControls.module.css";

export const renderField = (Component) => {
  return ({ input, meta, ...props }) => {
    return (
      <div className={style.forControl}>
        <Component
          meta={meta}
          {...props}
          {...input}
          className={
            meta.error && meta.active
              ? style.error + " " + style.form_field
              : style.form_field
          }
        />
        {meta.error && meta.active && (
          <div className={style.errorMessage}>{meta.error}</div>
        )}
      </div>
    );
  };
};
