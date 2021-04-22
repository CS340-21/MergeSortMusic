import React, { useState } from 'react';
import SavedPlaylistsAccordion from "./SavedPlaylistsAccordion.js";
import NewPlaylistDialog from "./NewPlaylistDialog.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  const [playlistNames, setPlaylistNames] = useState(props.location.state.playlist);
  //const username = props.location.state.username;
  //const password = props.location.state.password;
  const username = props.location.state.username;
  const password = props.location.state.password;

  return (
    <div>
        <div className={classes.main_content_user}>
          <h1 className={classes.title}>This is where you take control of your listening.</h1>
          <div className="saved_playlists">
            <NewPlaylistDialog playlist={playlistNames} setPlaylist={setPlaylistNames} username={username} password={password}></NewPlaylistDialog>
            {playlistNames.map(function(cur_playlist, index){
                    return <SavedPlaylistsAccordion key={index} playlist = {cur_playlist}></SavedPlaylistsAccordion>
                  })}
          </div>
        </div>
    </div>
  );
};

export default User;