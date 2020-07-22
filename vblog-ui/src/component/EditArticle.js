import React, {useContext} from 'react';
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
import { useTranslation } from 'react-i18next';
import { useRequest, useArticle } from './common/Hooks';
import { UserContext } from '../App'

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
const EditArticle = () => {
	const {loginUser} = useContext(UserContext)
	const history = useHistory()
	const classes = useStyles()
	const commonClasses = useCommonStyles()
	const { t } = useTranslation()
	const [saveArticle, jsonResponse, saveArticleLoading, saveArticleSuccess, saveArticleError] = useRequest()
	const [title, tag, category, mdContent, setTitle, setTag, setCategory, setMdContent, loading, error] = useArticle()

	const handleSubmit = async (mode) => {
		// article upload request body
		let data = {
			"title": title,
			"state": mode,
			"mdContent": mdContent
		}

		if(tag !== ""){
			debugger
			let tagStrs = tag.split(/，|,/)
			let tags = []
			for(let tagStr of tagStrs){
				tags.push({"tagName": tagStr.trim()})
			}
			data.tags = tags
		}

		if(category !== ""){
			data.category = category
		}

		saveArticle(data, "/articles", "POST", loginUser.token, ()=>{
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
							loading={saveArticleLoading}
							success={saveArticleSuccess}
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