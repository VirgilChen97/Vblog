import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import ArticleEditor from "./component/ArticleEditor/ArticleEditor";
import Login from "./component/LoginPage/Login";
import AuthenticationRoute from "./component/Common/AuthenticationRoute";
import Register from './component/LoginPage/Register';
import JwtUtil from './util/JwtUtil';

export const UserContext = React.createContext(null)

const App = () => {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    let user = JwtUtil.getDetailAndToken()
    setLoginUser(user)
  }, [])

  if (loginUser === null) {
    return null
  }

  return (
    <div className="root">
      <Router>
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
          <Switch>
            <AuthenticationRoute path="/newpost">
              <ArticleEditor />
            </AuthenticationRoute>
            <AuthenticationRoute path="/editArticle/:articleId">
              <ArticleEditor />
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
    </div>
  );
}

export default App;
