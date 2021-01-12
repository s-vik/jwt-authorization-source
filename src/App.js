import "./App.css";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Public from "./components/public/PublicContainer";
import Private from './components/private/Private';
import React from 'react';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <nav>
            <NavLink activeClassName="active" className="App-link" to="public">Public</NavLink>
            <NavLink activeClassName="active" className="App-link" to="private">Private</NavLink>
          </nav>
          <Switch>
            <Route path="/public" component={Public} />
            <Route path="/private" component={Private} />
            <Redirect to="/public" />
          </Switch>
      </header>
    </div>
  );
}

export default App;
