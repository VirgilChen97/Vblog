import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import ProgressButton from "./common/ProgressButton"
import useCommonStyles from "./common/CommonStyle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Editor from "./editor/Editor";
import { useHistory } from 'react-router-dom'
import JwtUtil from "../util/JwtUtil";
import { useTranslation } from 'react-i18next';
import zIndex from '@material-ui/core/styles/zIndex';
import { useRequest } from './common/Hooks';

const PUBLISHED = 0;
const DRAFT = 1;
const DELETED = -1;

const useStyles = makeStyles((theme) => ({
	title: {
		height: "64px",
		paddingLeft: "10px",
		padding: "4px",
		position: "fixed",
		width: "100vw",
		top: 0,
		zIndex: 999
	},
	editor: {
		height: "calc(100vh - 64px)",
		overflow: "hidden"
	}
}));

// Edit Article and new article page
const EditArticle = ({ loginUser }) => {
	const history = useHistory()
	const classes = useStyles()
	const commonClasses = useCommonStyles()
	const { t } = useTranslation()
	const [send, jsonResponse, loading, success, error] = useRequest()

	const [title, setTitle] = useState(t('editArticle.untitledArticle'))
	const [tag, setTag] = useState([])
	const [category, setCategory] = useState("")
	const [mdContent, setMdContent] = useState("# 在这里编写markdown内容")

	const handleSubmit = async (mode) => {
		// article upload request body
		let data = {
			"title": title,
			"state": mode,
			"mdContent": mdContent
		}

		if(tag !== ""){
			let tags = tag.split(/，|,/)
			data.tags = tags
		}

		if(category !== ""){
			data.category = category
		}

		send(data, "/articles", "POST", loginUser.token, ()=>{
			setTimeout(() => { history.push(`/page/${loginUser.username}`) }, 3000)
		})		
	}

	return (
		<div>
			<Card className={classes.title}>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item xs={6}>
						<FormControl fullWidth className={classes.margin}>
							<Input
								className={commonClasses.articleTitle}
								name="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</FormControl>
					</Grid>
					<Grid item>
						<TextField
							value={category}
							onChange={e => setCategory(e.target.value)}
							label={t('editArticle.categories')}
							placeholder={t('editArticle.categories')}
						/>
					</Grid>
					<Grid item>
						<TextField
							value={tag}
							onChange={e => setTag(e.target.value)}
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
			<div style={{height: "64px"}}></div>
			<Editor
				value={mdContent}
				onChange={(value, e) => setMdContent(value)}
			/>
		</div>
	);
}

export default EditArticle