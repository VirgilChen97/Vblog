import React, { useContext, useState } from 'react';
import { Button, ListItem, List, TextField, Avatar, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import ProgressButton from '../Common/ProgressButton';
import { useRequest } from '../Common/Hooks';
import { UserContext } from '../../App'
import { useTranslation } from 'react-i18next';

const PersonalSettings = ({ userInfo }) => {

  // Save settings request hook
  const [send, , loading, success, error] = useRequest()
  const { loginUser } = useContext(UserContext)

  // i18n
  const { t } = useTranslation()

  let settings = userInfo.userSettings
  const [imageUrl, setImageUrl] = useState(settings.imageUrl)
  const [nickName, setNickName] = useState(settings.nickName)
  const [blogName, setBlogName] = useState(settings.blogName)
  const [location, setLocation] = useState(settings.location)
  const [title, setTitle] = useState(settings.title)

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
        setImageUrl(responseBody.data.imageUrl)
      }
    } catch (e) {

    }
  }

  const handleSubmit = async () => {
    let data = {
      "nickName": nickName,
      "blogName": blogName,
      "title": title,
      "location": location,
      "imageUrl": imageUrl
    }
    send(data, `/users/${loginUser.id}/personalSettings`, "POST", loginUser.token)
  }

  return (
    <Card style={{width: "100%"}}>
      <CardContent>
        <Typography variant="h5">{t('settings.personalSettings')}</Typography>
        <List>
          <ListItem>
            <Avatar src={`${process.env.REACT_APP_API_ENDPOINT}${imageUrl}`}></Avatar>
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
            <TextField onChange={e => setNickName(e.target.value)} label={t('settings.nickName')} value={nickName} />
          </ListItem>
          <ListItem>
            <TextField onChange={e => setBlogName(e.target.value)} label={t('settings.blogTitle')} value={blogName} />
          </ListItem>
          <ListItem>
            <TextField onChange={e => setLocation(e.target.value)} label={t('settings.location')} value={location} />
          </ListItem>
          <ListItem>
            <TextField onChange={e => setTitle(e.target.value)} label={t('settings.title')} value={title} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <div style={{ justifyContent: "right", width: "100%" }}>
          <ProgressButton
            onClick={handleSubmit}
            loading={loading}
            success={success}
            error={error}
          >
            {t('settings.save')}
          </ProgressButton>
        </div>
      </CardActions>
    </Card>
  )
}

export default PersonalSettings