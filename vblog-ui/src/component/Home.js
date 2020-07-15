import React, {useEffect, useState} from 'react';
import BlogAppBar from './common/BlogAppBar';
import ArticleList from './article/ArticleList';
import BlogDrawer from './common/sidebar/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import BlogFab from "./common/Fab";
import {
  useParams,
  Switch,
  Redirect,
  useRouteMatch,
  Route
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
  }
}));

const Home = ({loginUser}) => {
  const classes = useStyles();
  let {username} = useParams()
  let match = useRouteMatch()

  const [owner, setOwner] = useState(null)
  const [editable, setEditable] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)
      let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${username}`)
      if(response.status >= 400){
        setError(true)
      }else{
        let ownerInfo = await response.json();
        setOwner(ownerInfo.data);
        setEditable(loginUser !== undefined && ownerInfo.data.id === loginUser.id)
        console.log(editable)
      }
    }
    fetchUserInfo()
  }, [loginUser])

  if(owner == null){
    return null
  }else {
    return (
      <div className={classes.root}>
        <BlogAppBar owner={owner}/>
        <BlogDrawer owner={owner} editable={editable}/>
        <Switch>
          <Route path={`${match.path}/articles`}>
            <ArticleList owner={owner}/>
          </Route>
          <Route path={`${match.path}**`}>
            <Redirect to={`${match.url}/articles`} />
          </Route>
        </Switch>
        <BlogFab/>
      </div>
    )
  }
}

export default Home;
