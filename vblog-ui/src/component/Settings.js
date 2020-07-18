import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTranslation } from 'react-i18next';
import { MenuItem, ListItemIcon, ListItemText, ListItem, List } from '@material-ui/core';
import JwtUtil from '../util/JwtUtil';
import ProgressButton from './common/ProgressButton';
import { useHistory } from 'react-router-dom';

const Settings = ({loginUser}) => {
  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation()
  const [userInfo, setUserInfo] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNickNameChange = event => {
    userInfo.nickName = event.target.value
    setUserInfo({
      ...userInfo,
      nickname: event.target.value
    })
  }

  const handleBlogNameChange = event => {
    setUserInfo({
      ...userInfo,
      blogName: event.target.value
    })
  }

  const handleTitleChange = event => {
    setUserInfo({
      ...userInfo,
      title: event.target.value
    })
  }

  const handleLocationChange = event => {
    setUserInfo({
      ...userInfo,
      location: event.target.value
    })
  }

  const handleEmailChange = event => {
    setUserInfo({
      ...userInfo,
      email: event.target.value
    })
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${loginUser.username}`)
      if(response.status >= 400){
        setError(true)
      }else{
        let ownerInfo = await response.json();
        setUserInfo(ownerInfo.data);
      }
    }
    fetchUserInfo()
  }, [loginUser])

  const handleSubmit = async (mode) => {
		let data = {
			"nickName": userInfo.nickName,
      "blogName": userInfo.blogName,
      "title": userInfo.title,
      "location": userInfo.location,
      "email": userInfo.email
		}

    // construct request with proper authentication header
		let request = JwtUtil.AuthenticateRequest(loginUser.token, data, `/users/${loginUser.id}`)

		// begin request
		setLoading(true)
		try {
			let response = await fetch(request)
			if (response.status >= 400) {
				setError(true)
			}
		} catch (e) {
			setError(true)
		}
		setLoading(false)
    setSuccess(true)
    handleClose()
    history.go(0)
  }

  console.log(userInfo)

  if(userInfo == null){
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
              <TextField onChange={handleNickNameChange} label={t('settings.nickName')} value={userInfo.nickName}/>
            </ListItem>
            <ListItem>
              <TextField onChange={handleBlogNameChange} label={t('settings.blogTitle')} value={userInfo.blogName}/>
            </ListItem>
            <ListItem>
              <TextField onChange={handleLocationChange} label={t('settings.location')} value={userInfo.location}/>
            </ListItem>
            <ListItem>
              <TextField onChange={handleTitleChange} label={t('settings.title')} value={userInfo.title}/>
            </ListItem>
            <ListItem>
              <TextField onChange={handleEmailChange} label={t('loginPage.email')} value={userInfo.email}/>
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
