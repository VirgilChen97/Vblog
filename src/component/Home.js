import React, {useEffect, useState} from 'react';
import BlogAppBar from './common/BlogAppBar';
import { Container, Toolbar } from '@material-ui/core';
import ArticleList from './article/ArticleList';
import BlogDrawer from './common/sidebar/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import BlogFab from "./common/Fab";
import {
  useParams
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
  }
}));

const Home = () => {
  const classes = useStyles();
  let {username} = useParams()

  const [owner, setOwner] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)
      let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/${username}`)
      if(response.status >= 400){
        setError(true)
      }else{
        let ownerInfo = await response.json();
        setOwner(ownerInfo.data);
      }
      setLoading(false)
    }
    fetchUserInfo()
  }, [username])

  if(owner == null){
    return null
  }else {
    return (
      <div className={classes.root}>
        <BlogAppBar owner={owner}/>
        <BlogDrawer owner={owner}/>
        <ArticleList owner={owner}/>
        <BlogFab/>
      </div>
    )
  }
}

export default Home;
