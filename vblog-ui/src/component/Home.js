import React, { useContext, useEffect } from 'react';
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

  // Logged in user from context
  const { loginUser } = useContext(UserContext)

  // username param from URL path
  let { username } = useParams()
  let match = useRouteMatch()

  // Obtain userInfo from according to username in path
  const [get,owner] = useUserInfo(undefined, username)

  useEffect(() => {
    get(undefined, username)
  }, [username])

  if (owner == null) {
    // Wait until we obtained the userInfo
    // Because sub component depend on userInfo
    return null
  } else {
    return (
      <div className={classes.root}>
        <BlogAppBar title={owner.userSettings.blogName} />
        <Container>
          <Toolbar />
          <div className="home-container">
            <BlogDrawer owner={owner} />
            <Switch>
              <Route path={`${match.path}/articles`}>
                {/* the article is editable if a user logged in and equal's to the blog owner */}
                <ArticleList owner={owner} editable={loginUser !== null && owner.id === loginUser.id} />
              </Route>
              <Route path={`${match.path}**`}>
                <Redirect to={`${match.url}/articles`} />
              </Route>
            </Switch>
          </div>
        </Container>
        {/* Show new article button if a user logged in and equal's to the blog owner */}
        {loginUser !== null && owner.id === loginUser.id ? <BlogFab /> : null}
      </div>
    )
  }
}

export default Home;
