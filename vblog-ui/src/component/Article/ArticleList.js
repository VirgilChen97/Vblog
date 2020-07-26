import React, {useState, useEffect} from 'react';
import {List, ListItem, Toolbar, Typography} from '@material-ui/core';
import ArticleCard from './ArticleCard';
import { useRequest } from '../Common/Hooks';
import { useTranslation } from 'react-i18next';

const ArticleList = ({owner, editable}) => {
	const {t} = useTranslation()
	const [getArticles, articles, loading, success, error] = useRequest()

	useEffect(() => {
		const fetchArticles = async () => {
			getArticles(null, `/articles?username=${owner.username}`, "GET", null)
		}
		fetchArticles()
	}, [owner])

	if (articles !== null) {
		if(articles.totalElements === 0){
			return (
				<div style={{width: "100%"}}>
					<Toolbar />
					<Typography align="center" style={{color: "grey", marginTop: "20px"}}>{t('articleList.noArticle')}</Typography>
				</div>
			)
		}
		return (
			<div style={{width: "100%"}}>
				<Toolbar />
				<List>
					{articles.content.map(article =>
						<ListItem key={article.id}>
							<ArticleCard
								id={article.id}
								title={article.title}
								createDate={article.createDate}
								lastModifiedDate={article.lastModifiedDate}
								mdContent={article.mdContent}
								editable={editable}
							/>
						</ListItem>
					)}
				</List>
			</div>
		)
	} else {
		return null
	}
}

export default ArticleList