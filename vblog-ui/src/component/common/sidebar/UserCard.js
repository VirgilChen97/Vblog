import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';

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

const UserCard = ( {owner, editable} ) => {
	const classes = useStyles()
	const {t} = useTranslation()

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
							<Typography align="center" variant="h6">
								{owner.displayName == null ? t('userCard.noNickName'):owner.displayName}
							</Typography>
							<Typography align="center">
								{owner.title == null ? t('userCard.noTitle'):owner.title}
							</Typography>
							<Typography align="center">
								{owner.location == null ? t('userCard.noLocation'):owner.location}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		)
	}
}

export default UserCard