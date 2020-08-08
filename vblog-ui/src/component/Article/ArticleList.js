import React, { useState, useEffect } from 'react';
import { List, ListItem, Card, Typography, Button, Breadcrumbs } from '@material-ui/core';
import ArticleCard from './ArticleCard';
import { useRequest, useQuery } from '../Common/Hooks';
import { useTranslation } from 'react-i18next';
import './ArticleList.css'
import { Link } from 'react-router-dom';

const ArticleList = ({ owner, editable }) => {
  const { t } = useTranslation()
  const [getArticles, articles] = useRequest()
  const [getTagOrCategory, tagOrCategory] = useRequest()
  const [page, setPage] = useState(0)
  let query = useQuery()

  let category = query.get("category")
  let tag = query.get("tag")

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `/articles?username=${owner.username}&page=${page}`
      if (category !== null) {
        url += `&category=${category}`
        getTagOrCategory(null, `/categories/${category}`, "GET", null)
      }
      if (tag !== null) {
        url += `&tag=${tag}`
        getTagOrCategory(null, `/tags/${tag}`, "GET", null)
      }
      getArticles(null, url, "GET", null, () => { window.scrollTo(0, 0) })
    }
    fetchArticles()
  }, [owner, page, tag, category, getArticles, getTagOrCategory])

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    setPage(page - 1)
  }

  console.log(tagOrCategory)

  if (articles !== null) {
    if (articles.totalElements === 0) {
      return (
        <div className="article-list">
          <Typography align="center" style={{ color: "grey", marginTop: "20px" }}>{t('articleList.noArticle')}</Typography>
        </div>
      )
    }
    return (
      <div className="article-list">
        <List>
          {(tag !== null || category !== null) && tagOrCategory !== null ?
            <ListItem>
              <Card className="article-card-root">
                <div className="article-list-breadcrumb">
                  <Breadcrumbs>
                    <Link to={`/page/${owner.username}/articles`}>{t('articleList.allArticles')}</Link>
                    <Typography>
                      {tag !== null && tagOrCategory.tagName !== null ? t('tagCard.tags') : t('categoryCard.categories')}
                    </Typography>
                    <Typography>
                      {tagOrCategory.tagName !== null ? tagOrCategory.tagName : null}
                      {tagOrCategory !== null ? tagOrCategory.categoryName : null}
                    </Typography>
                  </Breadcrumbs>
                </div>
              </Card>
            </ListItem> : null}
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