import React from 'react';
import './App.css';
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import EditArticle from "./component/EditArticle";
import Slide from "@material-ui/core/Slide";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/newpost">
          <EditArticle />
        </Route>
        <Route path="/">
          <Slide direction="up">
            <Home />
          </Slide>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
