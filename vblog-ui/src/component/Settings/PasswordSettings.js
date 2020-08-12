import React, { useContext, useState } from 'react';
import { Button, ListItem, List, TextField, Avatar, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import ProgressButton from '../Common/ProgressButton';
import { useRequest } from '../Common/Hooks';
import { UserContext } from '../../App'
import { useTranslation } from 'react-i18next';

const PasswordSettings = () => {

  // Save settings request hook
  const [send, , loading, success, error] = useRequest()
  const { loginUser } = useContext(UserContext)

  // i18n
  const { t } = useTranslation()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleSubmit = async () => {
    let data = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    send(data, `/users/${loginUser.id}/password`, "POST", loginUser.token)
    setOldPassword("")
    setNewPassword("")
    setRepeatPassword("")
  }

  return (
    <Card style={{width: "100%"}}>
      <CardContent>
        <Typography variant="h5">{t('settings.passwordSettings')}</Typography>
        <List>
          <ListItem>
            <TextField 
              type="password" 
              onChange={e => setOldPassword(e.target.value)} 
              label={t('settings.oldPassword')} 
              value={oldPassword}
              error={error === 40302}
              helperText={error === 40302 ? t('settings.oldPasswordNotCorrect') : null}
            />
          </ListItem>
          <ListItem>
            <TextField 
              type="password" 
              onChange={e => setNewPassword(e.target.value)} 
              label={t('settings.newPassword')} 
              value={newPassword}
              error={error === 40002}
              helperText={error === 40002 ? t('settings.passwordTooShort') : null}
            />
          </ListItem>
          <ListItem>
            <TextField 
              type="password" 
              onChange={e => setRepeatPassword(e.target.value)} 
              label={t('settings.repeatPassword')} 
              value={repeatPassword}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>     
        <ProgressButton
          onClick={handleSubmit}
          loading={loading}
          success={success}
          error={error}
        >
          {t('settings.save')}
        </ProgressButton>
      </CardActions>
    </Card>
  )
}

export default PasswordSettings