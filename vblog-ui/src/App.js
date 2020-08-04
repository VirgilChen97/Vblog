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
import Article from './component/Article/Article';

export const UserContext = React.createContext(null)

const App = () => {
  // null: Not logged in, undefined: trying to load logged in user
  const [loginUser, setLoginUser] = useState(undefined)
  console.log(loginUser)

  useEffect(() => {
    // Put userId, userName and token into loginUser
    let user = JwtUtil.getDetailAndToken()
    setLoginUser(user)
  }, [])

  if (loginUser === undefined) {
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
            <Route path={"/articles/:articleId"}>
              <Article />
            </Route>
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
              {loginUser !== null ?
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
