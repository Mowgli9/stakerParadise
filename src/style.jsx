import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    marginTop: theme.spacing(5),

    // textAlign: "center",
  },
  cardsContainer: {
    marginTop: theme.spacing(0),
  },
  currentSpan: {
    paddingRight: theme.spacing(15),
  }
  
}));

export default useStyles;
