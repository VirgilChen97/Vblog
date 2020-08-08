import React, { useContext, useEffect } from 'react';
import { Button, ListItem, List, TextField, Avatar, Toolbar, Card, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ProgressButton from './Common/ProgressButton';
import { useRequest, useUserInfo } from './Common/Hooks';
import { UserContext } from '../App'
import BlogAppBar from './Appbar/BlogAppBar';

const Settings = () => {

  const { loginUser } = useContext(UserContext)

  // i18n
  const { t } = useTranslation()
  const history = useHistory()

  // Save settings request hook
  const [send, , loading, success, error] = useRequest()

  // UserInfo Hook
  const [get, userInfo, setUserInfo] = useUserInfo(loginUser.id)

  useEffect(() => {
    if (loginUser !== null) {
      get(loginUser.id)
    }
  }, [loginUser, get])

  const handleSelectImage = async (e) => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('image', file)
    let init = {
      method: 'POST',
      body: formData
    }

    let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}/images`, init)
    request.headers.append('Authorization', loginUser.token)

    try {
      let response = await fetch(request)
      if (response.status === 200) {
        let responseBody = await response.json()
        setUserInfo({
          ...userInfo,
          'imageUrl': responseBody.data.imageUrl
        })
      }
    } catch (e) {

    }
  }

  const handleSubmit = async () => {
    let data = {
      "nickName": userInfo.nickName,
      "blogName": userInfo.blogName,
      "title": userInfo.title,
      "location": userInfo.location,
      "email": userInfo.email,
      "imageUrl": userInfo.imageUrl
    }

    send(data, `/users/${loginUser.id}`, "POST", loginUser.token, () => {
      history.go(0)
    })
  }

  if (userInfo == null) {
    return null
  }

  return (
    <div>
      <BlogAppBar title={t('userMenu.settings')} />
      <Toolbar></Toolbar>
      <Container>
        <Card>
          <List>
            <ListItem>
              <Avatar src={`${process.env.REACT_APP_API_ENDPOINT}${userInfo.imageUrl}`}></Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleSelectImage}
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span">
                  {t('settings.selectAvatar')}
                </Button>
              </label>
            </ListItem>
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
              })} label={t('settings.blogTitle')} value={userInfo.blogName} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                location: e.target.value
              })} label={t('settings.location')} value={userInfo.location} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                title: e.target.value
              })} label={t('settings.title')} value={userInfo.title} />
            </ListItem>
            <ListItem>
              <TextField onChange={e => setUserInfo({
                ...userInfo,
                email: e.target.value
              })} label={t('loginPage.email')} value={userInfo.email} />
            </ListItem>
            <ListItem>
              <ProgressButton
                onClick={handleSubmit}
                loading={loading}
                success={success}
                error={error}
              >
                {t('settings.save')}
              </ProgressButton>
            </ListItem>
          </List>
        </Card>
      </Container>
    </div>
  );
}

export default Settings
