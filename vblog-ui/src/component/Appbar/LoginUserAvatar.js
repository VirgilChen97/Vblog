import React, { useState } from 'react';
import { Avatar, Button, IconButton, MenuItem, Popover, ListItemIcon, ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import JwtUtil from '../../util/JwtUtil';
import { Link, useRouteMatch } from "react-router-dom";
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
        style={{
          color: 'white',
          border: '1px solid white'
        }}
        component={Link} 
        to={{
					pathname: "/LoginPage",
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