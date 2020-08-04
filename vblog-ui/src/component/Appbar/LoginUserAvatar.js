import React, { useState, useContext, useEffect } from 'react';
import { Button, IconButton, MenuItem, Popover, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import JwtUtil from '../../util/JwtUtil';
import { Link, useRouteMatch } from "react-router-dom";
import Settings from '../Settings';
import UserAvatar from '../Common/UserAvatar';
import { UserContext } from '../../App';
import './LoginUserAvatar.css';
import { useUserInfo } from '../Common/Hooks';

const LoginUserAvatar = () => {
  const { t } = useTranslation()
  const [anchor, setAnchor] = useState(false)
  let match = useRouteMatch()
  const { loginUser, setLoginUser } = useContext(UserContext)
  const [get, userInfo] = useUserInfo()

  useEffect(() => {
    if(loginUser!==null){
      get(loginUser.id)
    }
  }, [loginUser])

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogOut = () => {
    JwtUtil.removeToken()
    setLoginUser(null)
    handleClose()
  }

  if (loginUser === null) {
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
        <UserAvatar userId={loginUser.id} />
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
        <div className="login-user-avatar-user">
          <UserAvatar userId={loginUser.id} />
          <div className="login-user-avatar-user-info">
            {userInfo === null ? null : <Typography>{userInfo.nickName}</Typography>}
            {userInfo === null ? null : <Typography variant="caption">{userInfo.email}</Typography>}
          </div>
        </div>
        <Divider />
        <MenuItem component={Link} to={`/page/${loginUser.username}/articles`} onClick={handleClose}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>{t('userMenu.homepage')}</ListItemText>
        </MenuItem>
        <Settings loginUser={loginUser} />
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>{t('userMenu.logOut')}</ListItemText>
        </MenuItem>
      </Popover>
    </div>
  )
}

export default LoginUserAvatar