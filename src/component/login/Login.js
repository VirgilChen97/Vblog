import React, {useRef, useState} from 'react';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {useHistory, useLocation} from "react-router-dom"
import TokenUtil from "../../util/JwtUtil";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100vw",
		height: "100vh",
	}
}))

const Login = () => {
	const history = useHistory()
	const location = useLocation()
	const buttonRef = useRef(null)
	const[username, setUsername] = useState("")
	const[password, setPassword] = useState("")
	const[error, setError] = useState(false)
	const[invalid, setInvalid] = useState(false)
	const[loading, setLoading] = useState(false)

	const handleUsernameChange = event => {
		setInvalid(false)
		setUsername(event.target.value)
	}

	const handlePasswordChange = event => {
		setInvalid(false)
		setPassword(event.target.value)
	}

	const handleEnterPress = event => {
		if (event.key === 'Enter'){
			buttonRef.current.click()
		}
	}

	const handleLogin = async () => {
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
		let response = await fetch(request)
		if(response.status == 403){
			setInvalid(true)
		}else if(response.status > 400){
			setError(true)
		}else{
			debugger
			let responseJson = await response.json()
			TokenUtil.saveToken(responseJson.data.jwt)
			let { from } = location.state || { from: { pathname: `/page/${username}` } };
			history.push(from)
		}
	}

	return (
		<Card className="login-card">
			<CardContent onKeyDown={handleEnterPress}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h3">
							VBlog
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={invalid}
							id="outlined-username-input"
							label="Username"
							variant="outlined"
							onChange={handleUsernameChange}
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={invalid}
							id="outlined-password-input"
							label="Password"
							type="password"
							autoComplete="current-password"
							variant="outlined"
							onChange={handlePasswordChange}
							required
						/>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Button onClick={handleLogin} ref={buttonRef} color="primary">
					Login
				</Button>
			</CardActions>
		</Card>
	)
}

export default Login