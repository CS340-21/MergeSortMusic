import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  Inbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Playlists(props) {
  const classes = useStyles();
  const [playlists, setPlaylists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);

  const getPlaylists = () => {
    fetch("/spotify/get-playlists")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setPlaylists(data);
        console.log(data);
      });
  };
  
  const handleClick = () => {
    setOpenList(!openList);
  };


  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const renderList = () => {
    const listItems = [];

    for (const [index, playlist] of playlists.entries()) {
      listItems.push(
        <ListItem button key={index}>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary={playlist.name} />
        </ListItem>
      )
    }

    return (
      <div className={classes.paper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Playlists
            </ListSubheader>
          }
          className={classes.root}
        >
          {listItems}
        </List>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <div>
        <Button variant="contained" color="primary" disabled={!props.authenticated} onClick={handleOpen}>
          Import Playlist from Spotify
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>{renderList()}</Fade>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    if (props.authenticated) {
      getPlaylists();
    }
    return () => console.log("cleanup");
  }, []);

  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          My Playlists
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {renderModal()}
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
