import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import ReduxThunk from "redux-thunk";

import authReducer from "./auth-reducer";

let reducersPack = combineReducers({
  auth: authReducer,
  form: formReducer,
});

const store = createStore(reducersPack, compose(applyMiddleware(ReduxThunk)));
//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;
