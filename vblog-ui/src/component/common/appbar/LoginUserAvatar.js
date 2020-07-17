import React, { useState } from 'react';
import { Avatar, Button, IconButton, MenuItem, Popover, ListItemIcon, ListItemText, Divider, ListItem, CardContent, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import JwtUtil from '../../../util/JwtUtil';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginButton:{
    color: "white"
  }
}));

const LoginUserAvatar = ({ loginUser, setLoginUser }) => {
  const { t } = useTranslation()
  const [anchor, setAnchor] = useState(false)
  const classes = useStyles()
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
        className={classes.loginButton} 
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText>{t('userMenu.settings')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>{t('userMenu.logOut')}</ListItemText>
        </MenuItem>
      </Popover>
    </div>
  )
}

export default LoginUserAvatar