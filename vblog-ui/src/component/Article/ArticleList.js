import React, {useState, useEffect} from 'react';
import {List, ListItem, Toolbar, Typography, Button} from '@material-ui/core';
import ArticleCard from './ArticleCard';
import { useRequest } from '../Common/Hooks';
import { useTranslation } from 'react-i18next';
import './ArticleList.css'

const ArticleList = ({owner, editable}) => {
	const {t} = useTranslation()
	const [getArticles, articles, loading, success, error] = useRequest()
	const [page, setPage] = useState(0)

	useEffect(() => {
		fetchArticles()
	}, [owner, page])

	const fetchArticles = async () => {
		getArticles(null, `/articles?username=${owner.username}&page=${page}`, "GET", null, ()=>{window.scrollTo(0,0)})
	}

	const handleNextPage = () => {
		setPage(page + 1)
	}

	const handlePrevPage = () => {
		setPage(page - 1)
	}

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
				<div className="page-action">
					<Button disabled={page === 0} onClick={handlePrevPage}>{t('articleList.prevPage')}</Button>
					<Typography> {page + 1} / {articles.totalPages} </Typography>
					<Button disabled={page === articles.totalPages - 1} onClick={handleNextPage}>{t('articleList.nextPage')}</Button>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default ArticleList