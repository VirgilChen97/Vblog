import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useCommonStyles from '../Common/CommonStyle';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css'
import CodeBlock from "../../util/CodeBlock";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UserAvatar from '../Common/UserAvatar';
import { useArticle } from '../Common/Hooks';
import BlogAppBar from '../Appbar/BlogAppBar';
import { Container, Toolbar } from '@material-ui/core';
import './Article.css'

const Article = () => {
  const commonClasses = useCommonStyles();
  const { t } = useTranslation()
  const { articleId } = useParams();
  const [article, , loading, error] = useArticle(articleId)

  if (article.user === null) {
    return null
  }


  return (
    <div>
      <BlogAppBar title={article.user.blogName} />
      <Container>
        <Toolbar />
        <Card className={"article-root"}>
          <CardContent>
            <Typography className={commonClasses.articleTitle} color="textSecondary" gutterBottom>
              {article.title}
            </Typography>

            <div className="user-info">
              <div className="user-avatar">
                <UserAvatar userId={article.user.id} />
              </div>
              <div className="username-date">
                <Typography component="h2">
                  {article.user.nickName}
                </Typography>
                <Typography variant="caption" component="h2">
                  {t('articleCard.postAt')} {new Date(article.createDate).toDateString()}
                </Typography>
              </div>
            </div>
            <div className="markdown-body">
              <ReactMarkdown
                source={article.mdContent}
                renderers={{ code: CodeBlock }}
              />
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Article