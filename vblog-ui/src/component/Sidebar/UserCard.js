import React from 'react';
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';
import UserAvatar from '../Common/UserAvatar';

const useStyles = makeStyles(theme => ({
	userAvatar: {
		width: "150px",
		height: "150px",
		fontSize: "50px",
		margin: "auto",
		marginBottom: "10px"
	}
}))

const UserCard = ( {owner, editable} ) => {
	const classes = useStyles()
	const {t} = useTranslation()

	if(owner == null){
		return null
	}else {
		return (
			<Card className="card-base">
				<div className="card-title">
					<Typography variant="caption">{t('userCard.userInfo')}</Typography>
				</div>
				<div className="card-content">
					<Grid container justify="center">
						<Grid item xs={12}>
							<UserAvatar userId={owner.id} avatarClassName={classes.userAvatar}/>
						</Grid>
						<Grid item xs={12}>
							<Typography align="center" variant="h6">
								{owner.userSettings.nickName === null || owner.userSettings.nickName === "" ? t('userCard.noNickName'):owner.userSettings.nickName}
							</Typography>
							<Typography align="center">
								{owner.userSettings.title == null ? t('userCard.noTitle'):owner.userSettings.title}
							</Typography>
							<Typography align="center">
								{owner.userSettings.location == null ? t('userCard.noLocation'):owner.userSettings.location}
							</Typography>
						</Grid>
					</Grid>
				</div>
			</Card>
		)
	}
}

export default UserCard