import React, { useState } from 'react';
import { Avatar, Button, IconButton, MenuItem, Popover, ListItemIcon, ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import JwtUtil from '../../util/JwtUtil';
import { Link, useRouteMatch } from "react-router-dom";
import './LoginUserAvatar.css'
import Settings from '../Settings';

const LoginUserAvatar = ({ loginUser, setLoginUser }) => {
  const { t } = useTranslation()
  const [anchor, setAnchor] = useState(false)
  let match = useRouteMatch()

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogOut = () => {
    JwtUtil.removeToken()
    setLoginUser(undefined)
    handleClose()
  }

  if (loginUser === undefined) {
    return (
      <Button 
        className={"loginButton"}
        component={Link} 
        to={{
					pathname: "/login",
					state: { from: match.url }
				}}
      >
        {t('loginPage.login')}
      </Button>
    )
  }
  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <Avatar>A</Avatar>
      </IconButton>
      <Popover
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Settings loginUser={loginUser}/>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>{t('userMenu.logOut')}</ListItemText>
        </MenuItem>
      </Popover>
    </div>
  )
}

export default LoginUserAvatar