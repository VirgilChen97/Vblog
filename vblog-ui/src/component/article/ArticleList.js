import React, {useState, useEffect} from 'react';
import {List, ListItem, Toolbar} from '@material-ui/core';
import ArticleCard from './ArticleCard';

const ArticleList = ({owner}) => {
	const [articles, setArticles] = useState(null)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true)
				const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/articles?username=${owner.username}`)
				if (response.status >= 400) {
					setError(true)
				} else {
					let json = await response.json()
					let data = json.data
					setArticles(data)
				}
				setLoading(false)
			} catch (error) {
				setError(true)
			}
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