import React, {useState, useEffect} from 'react';
import {List, ListItem, Toolbar} from '@material-ui/core';
import ArticleCard from './ArticleCard';
import { useRequest } from '../Common/Hooks';

const ArticleList = ({owner, editable}) => {
	const [getArticles, articles, loading, success, error] = useRequest()

	useEffect(() => {
		const fetchArticles = async () => {
			getArticles(null, `/articles?username=${owner.username}`, "GET", null)
		}
		fetchArticles()
	}, [owner])

	if (articles != null) {
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