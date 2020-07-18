import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useTranslation } from 'react-i18next';
import { Divider, LinearProgress } from '@material-ui/core';

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
	},
	tag: {
		margin: "5px 5px 5px 0px"
	}
}))

const TagCard = ( {owner} ) => {
	const classes = useStyles()
	const {t} = useTranslation()
	const [tags, setTags] = useState(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchAllUserTags = async () => {
			setLoading(true)
			let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/tags?userId=${owner.id}`)
			if(response.status >= 400){
				setError(true)
			}else{
				let allTags = await response.json();
				setTags(allTags.data);
			}
			setLoading(false)
		}
		fetchAllUserTags()
	}, [owner])

	if(tags == null){
		return null
	}else {
		return (
			<Card className={classes.root}>
				<LinearProgress style={{visibility:loading?"visible":"hidden"}} />
				<CardContent>
					<Typography variant="h6">标签</Typography>
				</CardContent>
				<Divider />
				<CardContent>
					{tags.length !== 0 ? tags.map(tag => (
						<Chip
							className={classes.tag}
							key={tag.id}
							avatar={<Avatar>{tag.count}</Avatar>}
							label={tag.tagName}
							size="small"
						/>
					)): 
					<Typography align="center">{t('tagCard.noTags')}</Typography>}
				</CardContent>
			</Card>
		)
	}
}

export default TagCard