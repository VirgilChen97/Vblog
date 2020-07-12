import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root:{
		width: "100%",
	},
	userAvatar: {
		width: "150px",
		height: "150px",
		fontSize: "50px",
		margin: "auto",
		marginBottom: "10px"
	},
	userIcon:{
		width: "80%",
		height: "80%",
	}
}))

const UserCard = ( {owner} ) => {
	const classes = useStyles()

	if(owner == null){
		return null
	}else {
		return (
			<Card className={classes.root}>
				<CardContent>
					<Grid container justify="center">
						<Grid item xs={12}>
							<Avatar className={classes.userAvatar}>
								<PersonIcon className={classes.userIcon}/>
							</Avatar>
						</Grid>
						<Grid item xs={12}>
							<Typography align="center" variant="h6">{owner.displayName}</Typography>
							<Typography align="center">{owner.title}</Typography>
							<Typography align="center">{owner.location}</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		)
	}
}

export default UserCard