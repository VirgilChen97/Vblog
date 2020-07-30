import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useCommonStyles from '../Common/CommonStyle';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css'
import CodeBlock from "../../util/CodeBlock";
import { useTranslation } from 'react-i18next';
import './ArticleCard.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmButton from '../Common/ConfirmButton';
import { useRequest } from '../Common/Hooks';
import { UserContext } from '../../App';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

/**
 * id: Article id
 * date: Article create datetime
 * title: Article title
 * content: short version of Article content
 */
const ArticleCard = ({ id, createDate, lastModifiedDate, title, mdContent, editable }) => {
  const { loginUser } = useContext(UserContext)
  const commonClasses = useCommonStyles();
  const { t } = useTranslation()
  const history = useHistory()
  const match = useRouteMatch()

  const [deleteArticle, , loading, success, error] = useRequest()

  const handleDelete = () => {
    deleteArticle(null, `/articles/${id}`, "DELETE", loginUser.token)
    history.go(0)
  }

  if (success) {
    return null
  }

  return (
    <Card className={"article-card-root"}>
      <CardContent>
        <Typography variant="caption" component="h2">
          {t('articleCard.postAt')} {new Date(createDate).toDateString()}
        </Typography>
        <Typography className={commonClasses.articleTitle} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <div className="article-card-content">
          <div className="markdown-body">
            <ReactMarkdown
              source={mdContent}
              renderers={{ code: CodeBlock }}
            />
            <div className="content-mask" />
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div className="action-area-container">
          <Button
            size="small"
            component={Link}
            to={{ pathname: `/articles/${id}` }}
          >
            {t('articleCard.readMore')}
          </Button>
          {editable ?
            <div className="authenticated-area-container">
              <Button size="small" startIcon={<EditIcon />} component={Link} to={{ pathname: `/editArticle/${id}` }}>
                {t('articleCard.edit')}
              </Button>
              <ConfirmButton
                size="small"
                startIcon={<DeleteIcon />}
                style={{ color: "red" }}
                alertTitle={t('articleCard.confirmDelete')}
                alertText={t('articleCard.confirmDeleteInfo')}
                action={handleDelete}
              >
                {t('articleCard.delete')}
              </ConfirmButton>
            </div> : null}
        </div>
      </CardActions>
    </Card>
  );
}

export default ArticleCard