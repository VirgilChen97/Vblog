import React, {useEffect, useState} from 'react';
import BlogAppBar from "./common/BlogAppBar";
import {Container, Toolbar} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import useCommonStyles from "./common/CommonStyle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Editor from "./common/Editor";
import { useHistory, useLocation } from 'react-router-dom'
import JwtUtil from "../util/JwtUtil";


const PUBLISHED = 0;
const DRAFT = 1;
const DELETED = -1;

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

// Edit Article and new article page
const EditArticle = ({loginUser}) => {
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
	const commonClasses = useCommonStyles();
	const [title, setTitle] = useState("无标题文章")
	const [tag, setTag] = useState([])
	const [category, setCategory] = useState("")
	const [mdContent, setMdContent] = useState("")
	const [uploading, setUploading] = useState("false")
	const [error, setError] = useState("false")

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleTagChange = event => {
		setTag(event.target.value)
	}

	const handleCategoryChange = event => {
		setCategory(event.target.value)
	}

	const handleMdContentChange = (value, e) => {
		setMdContent(value)
	}

	const handleSubmit = async (mode) =>{
		// article upload request body
		let data = {
			"title": title,
			"state": mode,
			"tags": [
				{
					"tagName": tag
				}
			],
			"category": {
				"categoryName": category
			},
			"mdContent": mdContent
		}
		debugger
		// construct request with proper authentication header
		let request = JwtUtil.AuthenticateRequest(loginUser.token, data, "/articles")

		// begin request
		setUploading(true)
		try{
			let response = await fetch(request)
			if(response.status >= 400){
				setError(true)
			}
		}catch (e) {
			setError(true)
		}
		setUploading(false)
	}

	return (
		<div>
			<BlogAppBar/>
			<Container>
				<Toolbar/>
				<Card className={commonClasses.contentCard}>
					<CardContent>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FormControl fullWidth className={classes.margin}>
									<Input
										className={commonClasses.articleTitle}
										name="title"
										value={title}
										onChange={handleTitleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item container spacing={1}>
								<Grid item>
									<TextField value={tag} onChange={handleTagChange} label="文章分类" placeholder="文章分类"/>
								</Grid>
								<Grid item>
									<TextField value={category} onChange={handleCategoryChange} label="文章标签" placeholder="文章标签"/>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
					<Editor
						value={mdContent}
						onChange={handleMdContentChange}/>
					<Divider/>
					<CardActions>
						<Button onClick={()=>handleSubmit(PUBLISHED)}>发布</Button>
						<Button onClick={()=>handleSubmit(DRAFT)}>存为草稿</Button>
					</CardActions>

			</Container>
		</div>
	);
}

export default EditArticle