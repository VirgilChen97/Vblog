import React, { useEffect, useState } from 'react';
import BlogAppBar from "./common/BlogAppBar";
import { Container, Toolbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ProgressButton from "./common/ProgressButton"
import Divider from "@material-ui/core/Divider";
import useCommonStyles from "./common/CommonStyle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Editor from "./common/Editor";
import { useHistory, useLocation } from 'react-router-dom'
import JwtUtil from "../util/JwtUtil";
import { useTranslation } from 'react-i18next';
import CodeBlock from "../util/CodeBlock";
import ReactMarkdown from "react-markdown";


const PUBLISHED = 0;
const DRAFT = 1;
const DELETED = -1;

const useStyles = makeStyles((theme) => ({
	title:{
		height: "64px",
		paddingLeft: "10px",
		padding: "4px"
	},
	mdPreview: {
		overflow: "auto",
		height: "calc(100vh - 64px)"
	}
}));

// Edit Article and new article page
const EditArticle = ({ loginUser }) => {
	const history = useHistory()
	const classes = useStyles()
	const commonClasses = useCommonStyles()
	const { t } = useTranslation()

	const [title, setTitle] = useState(t('editArticle.untitledArticle'))
	const [tag, setTag] = useState([])
	const [category, setCategory] = useState("")
	const [mdContent, setMdContent] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

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

	const handleSubmit = async (mode) => {
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
		setLoading(true)
		try {
			let response = await fetch(request)
			if (response.status >= 400) {
				setError(true)
			}
		} catch (e) {
			setError(true)
		}
		setLoading(false)
		setSuccess(true)
		setTimeout(() => { history.push(`/page/${loginUser.username}`) }, 5000)
	}

	return (
		<div>
			<Card className={classes.title}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<FormControl fullWidth className={classes.margin}>
							<Input
								className={commonClasses.articleTitle}
								name="title"
								value={title}
								onChange={handleTitleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item>
						<TextField
							value={category}
							onChange={handleCategoryChange}
							label={t('editArticle.categories')}
							placeholder={t('editArticle.categories')}
						/>
					</Grid>
					<Grid item>
						<TextField
							value={tag}
							onChange={handleTagChange}
							label={t('editArticle.tags')}
							placeholder={t('editArticle.tags')}
						/>
					</Grid>
					<Grid item>
						<ProgressButton
							onClick={() => handleSubmit(PUBLISHED)}
							loading={loading}
							success={success}
						>
							{t('editArticle.publish')}
						</ProgressButton>
					</Grid>
				</Grid>
			</Card>
			<Card>
				<Grid container>
					<Grid item xs={6}>
						<Editor
							value={mdContent}
							onChange={handleMdContentChange}
						/>
					</Grid>
					<Grid item xs={6} className={classes.mdPreview}>
						<CardContent>
							<div className="markdown-body">
								<ReactMarkdown
									source={mdContent}
									renderers={{ code: CodeBlock }}
								/>
							</div>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}

export default EditArticle