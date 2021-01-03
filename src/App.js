import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';
import Trip from "./components/trip/Trip";
import Profile from "./components/user/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/trip">
          <Trip />
        </Route>
        <Route path="/">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
