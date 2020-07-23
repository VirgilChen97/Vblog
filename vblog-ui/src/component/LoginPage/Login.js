import React, { useState, useContext } from 'react';
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import { useHistory, useLocation, Link } from "react-router-dom"
import TokenUtil from "../../util/JwtUtil";
import { ListItem } from '@material-ui/core';
import LoginFrame from './LoginFrame';
import { useTranslation } from 'react-i18next';
import JwtUtil from '../../util/JwtUtil';
import { UserContext } from '../../App'

const Login = () => {
	const history = useHistory()
	const location = useLocation()
	const {t} = useTranslation()
	const {loginUser, setLoginUser} = useContext(UserContext)

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [invalid, setInvalid] = useState(false)

	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleUsernameChange = event => {
		setInvalid(false)
		setUsername(event.target.value)
	}

	const handlePasswordChange = event => {
		setInvalid(false)
		setPassword(event.target.value)
	}

	const handleLogin = async () => {
		setInvalid(false)
		setError(false)
		if(username === "" || password === ""){
			setInvalid(true)
			return
		}
		setLoading(true)
		let loginData = {
			"username": username,
			"password": password
		}
		let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}/token`, {
			headers: {
				'Content-Type': "application/json"
			},
			method: 'POST',
			body: JSON.stringify(loginData)
		})

		try {
			let response = await fetch(request)
			if (response.status == 403) {
				setLoading(false)
				setInvalid(true)
			} else if (response.status > 400) {
				setLoading(false)
				setError(true)
			} else {
				debugger
				let responseJson = await response.json()
				setLoginUser(JwtUtil.getDetailFromToken(responseJson.data.jwt))
				TokenUtil.saveToken(responseJson.data.jwt)
				let { from } = location.state || { from: { pathname: `/page/${username}` } };
				history.push(from)
			}
		} catch (error) {
			setLoading(false)
			setError(true)
		}
	}

	return (
		<LoginFrame action={handleLogin} buttonText={t('loginPage.LoginPage')} buttonDisabled={loading} inProgress={loading}>
			<List justify="center">
				<ListItem>
					<TextField
						error={invalid}
						id="outlined-username-input"
						label={t('loginPage.username')}
						variant="outlined"
						color="primary"
						onChange={handleUsernameChange}
						required
					/>
				</ListItem>
				<ListItem>
					<TextField
						error={invalid}
						id="outlined-password-input"
						label={t('loginPage.password')}
						type="password"
						autoComplete="current-password"
						variant="outlined"
						color="primary"
						onChange={handlePasswordChange}
						required
					/>
				</ListItem>
				<ListItem style={{color: "red"}}>
					{invalid?t('loginPage.wrongPassword'):null}
					{error?t('loginPage.serverError'):null}
				</ListItem>
				<ListItem>
					{t('loginPage.newUser')} <Link to="register">{t('loginPage.register')}</Link>
				</ListItem>
			</List>
		</LoginFrame>
	)
}

export default Login