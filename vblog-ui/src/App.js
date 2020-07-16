import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    let user = JwtUtil.getDetailAndToken()
    setLoginUser(user)
  }, [])

  console.log(loginUser)

  if(loginUser === null){
    return null
  }
  
  return (
    <Router>
      {loginUser !== undefined ?
        <Redirect to={`/page/${loginUser.username}`} /> :
        <Redirect to="/login" />
      }
      <Switch>
        <AuthenticationRoute loginUser={loginUser} path="/newpost">
          <EditArticle loginUser={loginUser} />
        </AuthenticationRoute>
        <Route path="/login">
          <Login loginUser={loginUser} setLoginUser={setLoginUser} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/page/:username">
          <Home loginUser={loginUser}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
