import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person'
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
								{owner.nickName === null || owner.nickName === "" ? t('userCard.noNickName'):owner.nickName}
							</Typography>
							<Typography align="center">
								{owner.title == null ? t('userCard.noTitle'):owner.title}
							</Typography>
							<Typography align="center">
								{owner.location == null ? t('userCard.noLocation'):owner.location}
							</Typography>
						</Grid>
					</Grid>
				</div>
			</Card>
		)
	}
}

export default UserCard