import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import UserCard from "./UserCard";
import TagCard from "./TagCard";
import CategoryCard from './CategoryCard';
import "./sidebar.css"


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger} unmountOnExit={true}>
      {children}
    </Slide>
  );
}

export default function ClippedDrawer({ owner, editable }) {
  return (
    <div className="sidebar-container">
      <List>
        <ListItem>
          <UserCard owner={owner} editable={editable} />
        </ListItem>
        <ListItem>
          <TagCard owner={owner} />
        </ListItem>
        <ListItem>
          <CategoryCard owner={owner} />
        </ListItem>
      </List>
    </div>
  );
}
