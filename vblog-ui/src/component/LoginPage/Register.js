import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom"
import { ListItem } from '@material-ui/core';
import LoginFrame from './LoginFrame';
import { useTranslation } from 'react-i18next';

const Register = () => {
	const history = useHistory()
	const {t} = useTranslation()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  
	const [invalid, setInvalid] = useState(null)
	const [invalidReason, setInvalidReason] = useState("")

	const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleEmailChange = event => {
    setInvalid(false)
    setEmail(event.target.value)
  }

	const handleUsernameChange = event => {
		setInvalid(false)
		setUsername(event.target.value)
  }

	const handlePasswordChange = event => {
		setInvalid(false)
		setPassword(event.target.value)
  }
  
  const handleRepeatPasswordChange = event => {
		setInvalid(false)
		setRepeatPassword(event.target.value)
	}

	const handleRegister = async () => {
		// Frontend pre validation

		/**
		 * Email validation
		 */

		// email is empty
		if(email === ""){
			setInvalid("email")
			setInvalidReason(t('loginPage.emailCanNotBeNull'))
			return
		}
		// email is not valid
		let emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // Email regex pattern
		if(!emailPattern.test(email)){
			setInvalid("email")
			setInvalidReason(t('loginPage.emailFormatNotCorrect'))
			return
		}

		/**
		 * Username validation
		 */

		// username is empty
		if(username === ""){
			setInvalid("username")
			setInvalidReason(t('loginPage.usernameCanNotBeNull'))
			return
		}
		// username is not valid
		let usernamePattern = /^[a-zA-Z0-9_-]{4,20}$/; // length 6-20, allows character, _ and -
		if(!usernamePattern.test(username)){
			setInvalid("username")
			setInvalidReason(t('loginPage.usernameNotValid'))
			return
		}

		/**
		 * Password validation
		 */
		// password is empty
		if(password === ""){
			setInvalid("password")
			setInvalidReason(t('loginPage.passwordCanNotBeNull'))
			return
		}
		// password length limit
		if(password.length < 6){
			setInvalid("password")
			setInvalidReason(t('loginPage.passwordTooShort'))
			return
		}
		// repeat password check
		if(password !== repeatPassword){
			setInvalid("password")
			setInvalidReason(t('loginPage.passwordNotSame'))
			return
		}

		setLoading(true)
		let registerData = {
			"username": username,
			"password": password,
			"email": email
		}

		let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
			headers: {
				'Content-Type': "application/json"
			},
			method: 'POST',
			body: JSON.stringify(registerData)
		})

		try {
			let response = await fetch(request)
			let responseJson = await response.json()
			setLoading(false)
			if (response.status === 409) {
				if(responseJson.code === 40901){
					setInvalid("email")
					setInvalidReason(t('loginPage.emailAlreadyExist'))
				}else if(responseJson.code === 40902){
					setInvalid("username")
					setInvalidReason(t('loginPage.usernameAlreadyExist'))
				}
			} else if (response.status > 400) {
				setError(true)
			} else {
				history.push("/LoginPage")
			}
		} catch (error) {
			setLoading(false)
			setError(true)
		}
	}

	return (
		<LoginFrame action={handleRegister} buttonText={t('loginPage.register')} buttonDisabled={loading}>
			<List>
        <ListItem>
					<TextField
						error={invalid === "email"}
						label={t('loginPage.email')}
						variant="outlined"
						onChange={handleEmailChange}
						required
					/>
				</ListItem>
				<ListItem>
					<TextField
						error={invalid === "username"}
						label={t('loginPage.username')}
						variant="outlined"
						onChange={handleUsernameChange}
						required
					/>
				</ListItem>
				<ListItem>
					<TextField
						error={invalid === "password"}
						label={t('loginPage.password')}
						type="password"
						autoComplete="current-password"
						variant="outlined"
						onChange={handlePasswordChange}
						required
					/>
				</ListItem>
        <ListItem>
					<TextField
						error={invalid === "password"}
						label={t('loginPage.repeatPassword')}
						type="password"
						autoComplete="current-password"
						variant="outlined"
						onChange={handleRepeatPasswordChange}
						required
					/>
				</ListItem>
				<ListItem style={{color: "red"}}>
					{invalid !== null ? invalidReason : null}
					{error ? t('loginPage.serverError'):null}
				</ListItem>
			</List>
		</LoginFrame>
	)
}

export default Register