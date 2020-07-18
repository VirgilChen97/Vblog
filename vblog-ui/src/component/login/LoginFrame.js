import React, { useRef } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { ListItem, LinearProgress } from '@material-ui/core';
import './LoginFrame.css'

const LoginFrame = ({children, action, buttonText, buttonDisabled, inProgress}) => {
  const buttonRef = useRef(null)
  
  const handleEnterPress = event => {
		if (event.key === 'Enter') {
			buttonRef.current.click()
		}
	}

	return (
		<div className={"login-frame-container"}>
			<Card elevation={3} className={"login-frame-root"}>
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
					className={"login-button"}
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
		</div>
	)
}

export default LoginFrame