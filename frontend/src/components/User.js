import React, { useState, useEffect } from 'react';
import SavedPlaylistsAccordion from "./SavedPlaylistsAccordion.js";
import NewPlaylistDialog from "./NewPlaylistDialog.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main_content_user: {
    marginTop: 25,
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
  useEffect(() => {}, [JSON.stringify(props.userPlaylist)]);


  return (
    <div>
        <div className={classes.main_content_user}>
          <div className="saved_playlists">
            <NewPlaylistDialog {...props}></NewPlaylistDialog>
            {props.userPlaylist !== undefined && props.userPlaylist.map(function(cur_playlist, index){
                    return <SavedPlaylistsAccordion key={index} playlist = {cur_playlist}></SavedPlaylistsAccordion>
            })}
          </div>
        </div>
    </div>
  );
};

export default User;