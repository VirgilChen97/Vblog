import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, ListItem, List, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@material-ui/icons/Settings';

import ProgressButton from './common/ProgressButton';
import { useRequest, useUserInfo } from './common/Hooks';

const Settings = ({ loginUser }) => {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()
  const history = useHistory()
  const [send,, loading, success,] = useRequest()
  const [userInfo, setUserInfo,,] = useUserInfo(loginUser.id)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let data = {
      "nickName": userInfo.nickName,
      "blogName": userInfo.blogName,
      "title": userInfo.title,
      "location": userInfo.location,
      "email": userInfo.email
    }

    send(data, `/users/${loginUser.id}`, "POST", loginUser.token, () => {
      handleClose()
      history.go(0)
    })
  }

  if (userInfo == null) {
    return null
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText>{t('userMenu.settings')}</ListItemText>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('userMenu.settings')}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                nickName: e.target.value
              })} label={t('settings.nickName')} value={userInfo.nickName} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                blogName: e.target.value
              })}  label={t('settings.blogTitle')} value={userInfo.blogName} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                location: e.target.value
              })}  label={t('settings.location')} value={userInfo.location} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                title: e.target.value
              })}  label={t('settings.title')} value={userInfo.title} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                email: e.target.value
              })}  label={t('loginPage.email')} value={userInfo.email} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <ProgressButton
            onClick={handleSubmit}
            loading={loading}
            success={success}
          >
            {t('settings.save')}
          </ProgressButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Settings
