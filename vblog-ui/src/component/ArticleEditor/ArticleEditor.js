import React, { useContext } from 'react';
import TextField from "@material-ui/core/TextField";
import ProgressButton from "../Common/ProgressButton"
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useRequest, useArticle } from '../Common/Hooks';
import { UserContext } from '../../App'
import BlogEditor from '../Common/Editor/BlogEditor';
import './ArticleEditor.css'

const PUBLISHED = 0;
const DRAFT = 1;
const DELETED = -1;

// Edit Article and new Article page
const ArticleEditor = () => {

	// Login User Context
	const { loginUser } = useContext(UserContext)

	// React router related constant
	const history = useHistory()
	const { articleId } = useParams()

	// i18n support constant
	const { t } = useTranslation()

	// Save article request hook
	const [saveArticle, , saveArticleLoading, saveArticleSuccess, saveArticleError] = useRequest()

	// Article hook
	const [article, setArticle] = useArticle(articleId)

	const handleSubmit = async (mode) => {
		// Article upload request body
		let data = {
			"title": article.title,
			"state": mode,
			"mdContent": article.mdContent
		}

		if (article.tag !== "") {
			let tagStrs = article.tag.split(/，|,/)
			let tags = []
			for (let tagStr of tagStrs) {
				tags.push({ "tagName": tagStr.trim() })
			}
			data.tags = tags
		}

		if (article.category !== "") {
			data.category = { "categoryName": article.category }
		}
		saveArticle(data, articleId ? `/articles/${articleId}` : "/articles", articleId ? "PUT" : "POST", loginUser.token, () => {
				setTimeout(() => { history.push(`/page/${loginUser.username}`) }, 3000)
		}, null)
	}

	if (article.user !== null && article.user.id !== loginUser.id) {
		return (
			// TODO: replace with proper placeholder
			<div>没有编辑权限</div>
		)
	}

	return (
		<div>
			<div className="article-title">
				<div className="article-info">
					<div className="title">
						<TextField
							value={article.title}
							onChange={e => setArticle.setTitle(e.target.value)}
							placeholder={t('articleEditor.title')}
							label={t('articleEditor.title')}
						/>
					</div>
					<div className="info">
						<TextField
							value={article.category}
							onChange={e => setArticle.setCategory(e.target.value)}
							label={t('articleEditor.categories')}
							placeholder={t('articleEditor.categories')}
						/>
					</div>
					<div className="info">
						<TextField
							value={article.tag}
							onChange={e => setArticle.setTag(e.target.value)}
							label={t('articleEditor.tags')}
							placeholder={t('articleEditor.tags')}
						/>
					</div>
				</div>
				<ProgressButton
					className="submit-button"
					variant="contained"
					onClick={() => handleSubmit(PUBLISHED)}
					loading={saveArticleLoading}
					success={saveArticleSuccess}
					error={saveArticleError}
				>
					{t('articleEditor.publish')}
				</ProgressButton>
			</div>
			<div className="article-editor">
				{article.mdContent !== null ?
					<BlogEditor
						onChange={(value,) => { setArticle.setMdContent(value) }}
						value={article.mdContent}
					/> : null}
			</div>
		</div >
	);
}

export default ArticleEditor