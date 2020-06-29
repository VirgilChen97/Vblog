import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import {Link} from "react-router-dom";

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
	const classes = useStyles();

	return (
		<div className={classes.fabBase}>
				<Fab variant="extended" color="secondary" aria-label="add" component={Link} to="/newpost">
					<AddIcon/>
					New Post
				</Fab>
		</div>
	);
}

export default BlogFab