import { makeStyles } from '@material-ui/core/styles';

const useCommonStyles = makeStyles((theme) => ({
  articleTitle:{
    fontSize: "28px",
    fontWeight: 600,
    color: "#000000"
  },
  contentCard:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export default useCommonStyles

