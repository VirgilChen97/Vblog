import React, { useContext, useEffect } from 'react';
import { Toolbar, Card, Container, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useUserInfo } from '../Common/Hooks';
import { UserContext } from '../../App'
import BlogAppBar from '../Appbar/BlogAppBar';
import PersonalSettings from './PersonalSettings';
import PasswordSettings from './PasswordSettings';
import EmailSettings from './EmailSettings'

const Settings = () => {

  const { loginUser } = useContext(UserContext)

  // i18n
  const { t } = useTranslation()

  // UserInfo Hook
  const [get, userInfo, setUserInfo] = useUserInfo(loginUser.id)

  useEffect(() => {
    if (loginUser !== null) {
      get(loginUser.id)
    }
  }, [loginUser])

  if (userInfo == null) {
    return null
  }

  return (
    <div>
      <BlogAppBar title={t('userMenu.settings')} />
      <Toolbar></Toolbar>
      <Container>
        <List>
          <ListItem>
            <PersonalSettings userInfo={userInfo}/>
          </ListItem>
          <ListItem>
            <PasswordSettings userInfo={userInfo}/>
          </ListItem>
          <ListItem>
            <EmailSettings userInfo={userInfo}/>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default Settings
