import React, {useEffect, useState} from 'react';
import BlogAppBar from './appbar/BlogAppBar';
import ArticleList from './article/ArticleList';
import BlogDrawer from './sidebar/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import BlogFab from "./common/Fab";
import {
  useParams,
  Switch,
  Redirect,
  useRouteMatch,
  Route
} from 'react-router-dom'
import { useUserInfo } from './common/Hooks';

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
  }
}));

const Home = ({loginUser, setLoginUser}) => {
  const classes = useStyles();
  let {username} = useParams()
  let match = useRouteMatch()
  const [owner,,loading, error] = useUserInfo(undefined, username)

  if(owner == null){
    return null
  }else {
    return (
      <div className={classes.root}>
        <BlogAppBar owner={owner} loginUser={loginUser} setLoginUser={setLoginUser}/>
        <BlogDrawer owner={owner}/>
        <Switch>
          <Route path={`${match.path}/articles`}>
            <ArticleList owner={owner}/>
          </Route>
          <Route path={`${match.path}**`}>
            <Redirect to={`${match.url}/articles`} />
          </Route>
        </Switch>
        {loginUser !== undefined && owner.id === loginUser.id ? <BlogFab/> : null}
      </div>
    )
  }
}

export default Home;
