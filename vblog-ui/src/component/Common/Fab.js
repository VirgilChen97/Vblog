import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	fabBase: {
		'& > *': {
			margin: theme.spacing(1),
		},
		position: "fixed",
		bottom: "10px",
		right: "10px"
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

const BlogFab = () => {
	const classes = useStyles()
	const {t} = useTranslation()

	return (
		<div className={classes.fabBase}>
				<Fab variant="extended" color="secondary" aria-label="add" component={Link} to={"/newpost"}>
					<AddIcon className={classes.extendedIcon}/>
					{t('fab.newPost')}
				</Fab>
		</div>
	);
}

export default BlogFab