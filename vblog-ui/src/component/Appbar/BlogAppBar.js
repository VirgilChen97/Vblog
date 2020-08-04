import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles, Grid } from '@material-ui/core';
import LoginUserAvatar from './LoginUserAvatar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const BlogAppBar = ({owner}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">{owner.blogName}</Typography>
              </Grid>
              <Grid item>
                <LoginUserAvatar />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default BlogAppBar