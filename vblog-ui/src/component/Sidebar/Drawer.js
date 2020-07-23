import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import UserCard from "./UserCard";
import TagCard from "./TagCard";
import CategoryCard from './CategoryCard';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger} unmountOnExit={true}>
      {children}
    </Slide>
  );
}

export default function ClippedDrawer ({ owner, editable }) {
  const classes = useStyles();

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <HideOnScroll>
        <Toolbar />
      </HideOnScroll>
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <UserCard owner={owner} editable={editable}/>
          </ListItem>
          <ListItem>
            <TagCard owner={owner}/>
          </ListItem>
          <ListItem>
            <CategoryCard owner={owner}/>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
