import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useCommonStyles from '../common/CommonStyle';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css'
import CodeBlock from "../../util/CodeBlock";
import { useTranslation } from 'react-i18next';
import './ArticleCard.css'

/**
 * id: Article id
 * date: Article create datetime
 * title: Article title
 * content: short version of article content
 */
const ArticleCard = ({id, createDate, lastModifiedDate, title, mdContent}) => {
  const commonClasses = useCommonStyles();
  const {t} = useTranslation()

  return (
    <Card className={"article-card-root"}>
      <CardContent>
        <Typography variant="caption" component="h2">
          {t('articleCard.postAt')} {new Date(createDate).toDateString()}
        </Typography>
        <Typography className={commonClasses.articleTitle}  color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <div className="markdown-body">
          <ReactMarkdown
            source={mdContent}
            renderers={{code: CodeBlock}}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">{t('articleCard.readMore')}</Button>
      </CardActions>
    </Card>
  );
}

export default ArticleCard