import React, { useContext } from 'react';
import BlogAppBar from './Appbar/BlogAppBar';
import ArticleList from './Article/ArticleList';
import BlogDrawer from './Sidebar/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import BlogFab from "./Common/Fab";
import {
  useParams,
  Switch,
  Redirect,
  useRouteMatch,
  Route
} from 'react-router-dom'
import { useUserInfo } from './Common/Hooks';
import { UserContext } from '../App'
import { Container, Toolbar } from '@material-ui/core';
import './Home.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

const Home = () => {
  const classes = useStyles();
  const { loginUser, setLoginUser } = useContext(UserContext)
  let { username } = useParams()
  let match = useRouteMatch()
  const [owner, , loading, error] = useUserInfo(undefined, username)

  if (owner == null) {
    return null
  } else {
    return (
      <div className={classes.root}>
        <BlogAppBar owner={owner} />
        <Container>
          <Toolbar/>
          <div className="home-container">
            <BlogDrawer owner={owner} />
            <Switch>
              <Route path={`${match.path}/articles`}>
                <ArticleList owner={owner} editable={loginUser && owner.id === loginUser.id} />
              </Route>
              <Route path={`${match.path}**`}>
                <Redirect to={`${match.url}/articles`} />
              </Route>
            </Switch>
          </div>
        </Container>
        {loginUser !== undefined && owner.id === loginUser.id ? <BlogFab /> : null}
      </div>
    )
  }
}

export default Home;
