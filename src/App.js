import React from 'react';
import './App.css';
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import EditArticle from "./component/EditArticle";
import Login from "./component/login/Login";
import AuthenticationRoute from "./component/common/AuthenticationRoute";

function App() {
  return (
    <Router>
      <Switch>
        <AuthenticationRoute path="/newpost">
          <EditArticle />
        </AuthenticationRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/page/:username">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
