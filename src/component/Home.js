import React from 'react';
import BlogAppBar from './common/BlogAppBar';
import { Container, Toolbar } from '@material-ui/core';
import ArticleList from './article/ArticleList';
import BlogDrawer from './common/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import BlogFab from "./common/Fab";

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BlogAppBar />
      <BlogDrawer />
      <ArticleList />
      <BlogFab />
    </div>
  );
}

export default Home;
