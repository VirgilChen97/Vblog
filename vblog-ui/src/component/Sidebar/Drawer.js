import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UserCard from "./UserCard";
import TagCard from "./TagCard";
import CategoryCard from './CategoryCard';
import "./sidebar.css"

export default function ClippedDrawer({ owner, editable }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
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
    </div>
  );
}
