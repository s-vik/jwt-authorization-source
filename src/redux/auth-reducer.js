import { authAPI } from "../api/api";

const SET_AUTH_USER_ERROR = "auth/SET_AUTH_USER_ERROR";
const SET_REG_USER_ERROR = "auth/SET_REG_USER_ERROR";
const SET_IS_AUTH = "auth/SET_IS_AUTH";
const SET_IS_FETCHING = "auth/SET_IS_FETCHING";

let initialState = {
  isAuth: false,
  error: null,
  regError: null,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_REG_USER_ERROR:
      return {
        ...state,
        regError: action.regError,
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const setAuthError = (error) => ({
  type: SET_AUTH_USER_ERROR,
  error,
});
export const setIsAuth = (isAuth) => ({
  type: SET_IS_AUTH,
  isAuth,
});
export const setRegUserError = (regError) => ({
  type: SET_REG_USER_ERROR,
  regError,
});
export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  isFetching,
});

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    let response = await authAPI.loginUser(email, password);
    if (response.data.statusCode === 200) {
      dispatch(setIsAuth(true));
      localStorage.setItem("access_token", response.data.body.access_token);
      localStorage.setItem("refresh_token", response.data.body.refresh_token);
      dispatch(setIsFetching(false));
    } else {
      dispatch(setAuthError("Wrong pass or email"));
      dispatch(setIsFetching(false));
    }
  };
};
export const signUp = (email, password) => {
  return async (dispatch) => {
    let response = await authAPI.createUser(email, password);
    if (response.data.status === "Ok") {
      dispatch(login(email, password));
      dispatch(setIsFetching(false));
    } else {
      dispatch(setRegUserError("account is already exist"));
    }
  };
};
export const refreshToken = () => {
  return async (dispatch) => {
    let response = await authAPI.refresh();
    if (response.data.statusCode === 200) {
      localStorage.setItem("access_token", response.data.body.access_token);
      localStorage.setItem("refresh_token", response.data.body.refresh_token);
      dispatch(me());
    }
  };
};
export const me = () => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    let response = await authAPI.me();
    if (response.data.body.status === "ok") {
      dispatch(setIsAuth(true));
      dispatch(setIsFetching(false));
    } else if (
      response.data.body.status === "error" &&
      localStorage.getItem("refresh_token")
    ) {
      dispatch(setIsAuth(false));
      dispatch(refreshToken());
    } else if (!localStorage.getItem("refresh_token")) {
      dispatch(setIsAuth(false));
      dispatch(setIsFetching(false));
    }
  };
};

export default authReducer;
