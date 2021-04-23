import React, {useState, useEffect, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, Grid } from '@material-ui/core';
import SongCard from './SongCard';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
   'max-width': '100%',
  },
  dialogTitle:{
    'text-align': 'center'
  },
  first: {
    'text-align': '-webkit-center'
  },
  second: {
    'text-align': '-webkit-center'
  },
  grid:{
    'padding': '20px'

  },
});

export default function SortDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, playList } = props;
  const [ selected, setSelected ] = useState(false);
  const [ new_order, setNewOrder ] = useState([]);
  var rem_tracks = props.tracks

  useEffect(() => {
    setSelected(false)
  }, [selected]);


  const handleClose = () => {
      //post to web api then reset new_order
    if(props.tracks.length == 0){
      var new_item = props.data
      new_item['tracks'] = new_order
      props.setTracks(new_order)
      var item = {
        playlist_id: playList.playlist_id,
        items: new_item
      }
      var api_url = 'http://127.0.0.1:8000/api/playlist-info/'
      api_url = api_url.concat(playList.playlist_id)
      axios.post(api_url, item)

      setNewOrder([]);
      onClose(selectedValue);
    }
    else{
      //setNewOrder([]);
      onClose(selectedValue);
    }
  };

  const clickFirst = () => {
      var temp = rem_tracks.splice(0, 1)
      var temp2 = new_order
      temp2.push(temp[0])
      setNewOrder(temp2)
      console.log(new_order)
    if(rem_tracks.length == 1){
      var temp = rem_tracks.splice(0, 1)
      var temp2 = new_order
      temp2.push(temp[0])
      setNewOrder(temp2)
      console.log("only 2 track left",rem_tracks.length , new_order)
      handleClose();
      setSelected(true)
    }
    else{
      setSelected(true)
    }
  }

  const clickSecond = () => {
    var temp = rem_tracks.splice(1, 1)
    var temp2 = new_order
    temp2.push(temp[0])
    setNewOrder(temp2)
    console.log(new_order)
    if(rem_tracks.length == 1){
      var temp = rem_tracks.splice(0, 1)
      var temp2 = new_order
      temp2.push(temp[0])
      setNewOrder(temp2)
      console.log("only 2 track left",rem_tracks.length , new_order)
      handleClose();
      setSelected(true)
    }
    else{
      setSelected(true)
    }
  }
 
  return (
    <Dialog 
      fullWidth={true}
      maxWidth = {'md'}
      onClose={handleClose}
      open={open}
      className={classes.Dialog}
    >
    <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">{playList.name}</DialogTitle>
     <DialogContent style={{ overflow: "hidden"}}>
        <Grid container spacing={1} className={classes.grid}>
          <Grid container item xs={12} spacing={0}>
            
            <Grid item xs={6} className={classes.first} onClick={clickFirst}>
                { props.tracks.length >= 1 &&
                <SongCard key ={1} song={props.tracks[0]}></SongCard>}
            </Grid>
            <Grid item xs={6} className={classes.first} onClick={clickSecond}>   
                { props.tracks.length >= 2 &&
                  <SongCard key ={2} song={props.tracks[1]}></SongCard>}
            </Grid>
          </Grid>
        </Grid>
        <LinearProgress variant="buffer" value={20} valueBuffer={100} />
      </DialogContent>
    </Dialog>

  );
}

SortDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};