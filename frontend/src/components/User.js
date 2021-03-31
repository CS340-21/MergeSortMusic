import SavedPlaylistsAccordion from "./SavedPlaylistsAccordion.js";
import NewPlaylistDialog from "./NewPlaylistDialog.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 350,
  },
  tabledata: {
    padding: 20,
  },
  main_content_user: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "sans-serif",
    title: {
      fontWeight: "bold",
      fontStyle: "italic",
      color: "#fff",
      textShadow: "3px 3px #1db954",
    }
  },
}));

const User = (props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main_content_user}>
        <h1 className={classes.title}>
          This is where you take control of your listening.
        </h1>
        <div className="saved_playlists">
          <NewPlaylistDialog></NewPlaylistDialog>
          <SavedPlaylistsAccordion></SavedPlaylistsAccordion>
          <SavedPlaylistsAccordion></SavedPlaylistsAccordion>
        </div>
      </div>
    </div>
  );
};

export default User;
