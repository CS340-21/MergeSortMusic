import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SongCard from './SongCard';
import LinearProgress from '@material-ui/core/LinearProgress';

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

  const handleClose = () => {
    onClose(selectedValue);
  };

  const clickFirst = () => {
    alert("They chose the first one");
  }

  const clickSecond = () => {
    alert("They chose the second one");
  }
  // Right now clicking on the grid item triggers the click
  // even for tracking which card was selected in the sort. 
  // I think that does need to change to SongCard, because
  // right now if they go to click the spotify player it'll 
  // just select 
  // that song as the best. 
  return (
    <Dialog 
      fullWidth={true}
      maxWidth = {'md'}
      onClose={handleClose}
      open={open}
      className={classes.Dialog}
    >
      <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">{playList.name}</DialogTitle>
      <Grid container spacing={1} className={classes.grid}>
        <Grid container item xs={12} spacing={0}>
          <Grid item xs={6} className={classes.first} onClick={clickFirst}>
            <SongCard></SongCard>
          </Grid>
          <Grid item xs={6} className={classes.second} onClick={clickSecond}>
            <SongCard></SongCard>
          </Grid>
        </Grid>
      </Grid>
      <LinearProgress variant="buffer" value={20} valueBuffer={100} />
    </Dialog>
  );
}

SortDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};