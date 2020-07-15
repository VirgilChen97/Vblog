import React, { useRef, useState } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ListItem, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: "350px",
		margin: "auto",
		marginTop: "20vh"
	},
	loginButton: {
		width: "100%"
	}
}))

const LoginFrame = ({children, action, buttonText, buttonDisabled, inProgress}) => {
	const classes = useStyles()
  const buttonRef = useRef(null)
  
  const handleEnterPress = event => {
		if (event.key === 'Enter') {
			buttonRef.current.click()
		}
	}

	return (
		<Card className="login-card" className={classes.root}>
			<LinearProgress style={{visibility:inProgress?"visible":"hidden"}} />
			<CardContent onKeyDown={handleEnterPress}>
        <List justify="center">
					<ListItem>
						<Typography variant="h3">
							VBlog
						</Typography>
					</ListItem>
				</List>
        {children}
			</CardContent>
			<Button
				className={classes.loginButton}
				variant="contained"
				onClick={action}
				ref={buttonRef}
				color="primary"
				size="large"
				disabled={buttonDisabled}
			>
				{buttonText}
			</Button>
		</Card>
	)
}

export default LoginFrame