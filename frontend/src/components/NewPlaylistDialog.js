import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Divider } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

//Needed to make a post request to backend -- DO NOT REMOVE
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function NewPlaylistDialog(props) {
  const [open, setOpen] = useState(false);
  const [displayModal, setModalDisplay] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [spotifyPlaylist, setSpotifyPlaylist] = useState([]);
  const [possibleImportPlaylist, setPossibleImportPlaylist] = useState([]);

  const authenticateSpotify = () => {
    fetch("http://127.0.0.1:8000/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("http://127.0.0.1:8000/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
              fetch("/spotify/get-playlists")
                .then((response) => {
                  if (!response.ok) {
                    return {};
                  } else {
                  return response.json();
                }
                }).then((data) => {
                  setSpotifyPlaylist(data);
                  console.log(data);
              });
            });
        }
        else{
          fetch("/spotify/get-playlists")
            .then((response) => {
              if (!response.ok) {
                return {};
              } else {
                return response.json();
              }
            }).then((data) => {
              setSpotifyPlaylist(data);
            });
        }
      });
  };


  const importPlaylist = () =>{
    var user = {
      username: props.username,
      password: props.password,
      playlist: []
    }
    possibleImportPlaylist.forEach((playlist) => {
      user.playlist.push(playlist)
      var url = 'http://127.0.0.1:8000/spotify/get-playlist-info/'
      url = url.concat(playlist['playlist_id'])
      console.log(url)
      fetch(url).then(response => response.json()).then((data) => {
        console.log(data['id'])
        var item = {
          playlist_id: data['id'],
          items: data
        }
        var api_url = 'http://127.0.0.1:8000/api/playlist-info/'
        api_url = api_url.concat(playlist['playlist_id'])
        axios.post(api_url, item)
      });
    });
    axios.post('http://127.0.0.1:8000/login/', user).then(()=> {
      props.setPlaylist(user.playlist);
    });

  }

  const addPossiblePlaylist = (playlist) => {
    var tempPlaylist = possibleImportPlaylist
    if(tempPlaylist.includes(playlist)){
      tempPlaylist.splice(tempPlaylist.indexOf(playlist), 1);
    }
    else{
      tempPlaylist.push(playlist);
    }
    console.log(tempPlaylist)
    setPossibleImportPlaylist(tempPlaylist);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
    setModalDisplay(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setModalDisplay(false);
  };

  if(!displayModal){
    return (
      <div>
        <Button
          variant="outlined" 
          color="primary" 
          onClick={handleClickOpen}
          style={{minWidth: "15%", 
                  margin: "auto",
                  color: "#222326",
                  backgroundColor: "#1db954",
                }}>Import Playlist</Button>
      </div>
    );
  }
  else{
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Link your Spotify Account or Import a Playlist!</DialogTitle>
        <Divider></Divider>
        <Button onClick={() => {authenticateSpotify();}} disabled={spotifyAuthenticated} variant="contained" color="default" startIcon={<ImportExportIcon />}>Link Spotify</Button>
        <List>
          {spotifyPlaylist.map((playlist, index) => {
            const labelId = `checkbox-list-label-${playlist.name}`;
            return (
              <ListItem key={index} role={undefined} dense button onClick={null}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    checked = {props.playlist.includes(playlist)}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick = {() => {addPossiblePlaylist(playlist);}}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${playlist.name}`} />
              </ListItem>
            );
          })}
        </List>
        <Button onClick={() => {importPlaylist();}} disabled={!spotifyAuthenticated} variant="contained" color="default" startIcon={<ImportExportIcon />}>Import Playlist</Button>
      </Dialog>
    );
  }
}