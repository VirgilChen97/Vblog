import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useCommonStyles from '../common/CommonStyle';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css'
import CodeBlock from "../../util/CodeBlock";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * id: Article id
 * date: Article create datetime
 * title: Article title
 * content: short version of article content
 */
const ArticleCard = ({id, createDate, lastModifiedDate, title, mdContent}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="caption" component="h2">
          发布于 {new Date(createDate).toDateString()}
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
        <Button size="small">阅读更多</Button>
      </CardActions>
    </Card>
  );
}

export default ArticleCard