import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import EditArticle from "./component/EditArticle";
import Login from "./component/login/Login";
import AuthenticationRoute from "./component/common/AuthenticationRoute";
import Register from './component/login/Register';
import JwtUtil from './util/JwtUtil';

export const UserContext = React.createContext(null)

const App = () => {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    let user = JwtUtil.getDetailAndToken()
    setLoginUser(user)
  }, [])

  console.log(loginUser)

  if (loginUser === null) {
    return null
  }

  return (
    <Router>
      <UserContext.Provider value={{ loginUser, setLoginUser }}>
        <Switch>
          <AuthenticationRoute path="/newpost">
            <EditArticle />
          </AuthenticationRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/page/:username">
            <Home />
          </Route>
          <Route path="/">
            {loginUser !== undefined ?
              <Redirect to={`/page/${loginUser.username}`} /> :
              <Redirect to="/login" />
            }
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
