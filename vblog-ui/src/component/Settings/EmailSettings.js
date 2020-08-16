import React, { useContext, useState, useEffect } from 'react';
import { Button, ListItem, List, TextField, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import ProgressButton from '../Common/ProgressButton';
import { useRequest } from '../Common/Hooks';
import { UserContext } from '../../App'
import { useTranslation } from 'react-i18next';

const EmailSettings = ({ userInfo }) => {

  // Save settings request hook
  const [sendChangeEmailRequest, ,changeLoading, changeSuccess, changeError] = useRequest()
  const [sendVerificationEmailRequest,,sendLoading, sendSuccess, sendError] = useRequest()

  const { loginUser } = useContext(UserContext)

  // i18n
  const { t } = useTranslation()

  const [email, setEmail] = useState(userInfo.email)

  const [count, setCount] = useState(60)
  const [disable, setDisable] = useState(false)

  const errors = {
    40901: t('loginPage.emailAlreadyExist'),
    40001: t('loginPage.emailFormatNotCorrect')
  }

  useEffect(() => {
    if (disable) {
      if (count === 0) {
        setDisable(false)
        setCount(60)
      } else {
        setTimeout(() => setCount(count - 1), 1000);
      }
    }
  }, [count, disable])

  const handleSubmit = async () => {
    let data = {
      "email": email,
    }
    sendChangeEmailRequest(data, `/users/${loginUser.id}/email`, "POST", loginUser.token)
  }

  const handleEmail = () => {
    setDisable(true)
    sendVerificationEmailRequest(null, `/verify`, "POST", loginUser.token)
  }

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5">{t('settings.emailSettings')}</Typography>
        <List>
          <ListItem>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                onChange={e => setEmail(e.target.value)}
                label={t('settings.email')}
                value={email}
                error={changeError in errors}
                helperText={changeError in errors ? errors[changeError] : null}
              />
              {userInfo.emailVerified ? null : t('settings.emailNotVerified')}
              <ProgressButton 
                variant="outlined" 
                onClick={handleEmail} 
                disabled={disable}
                loading={sendLoading}
                success={sendSuccess}
                error={sendError}
              >
                {t('settings.resendVerificationEmail')} {disable ? count : null}
              </ProgressButton>
            </div>
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <ProgressButton
          onClick={handleSubmit}
          loading={changeLoading}
          success={changeSuccess}
          error={changeError}
        >
          {t('settings.save')}
        </ProgressButton>
      </CardActions>
    </Card>
  )
}

export default EmailSettings