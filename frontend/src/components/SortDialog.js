import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SongCard from './SongCard';

const useStyles = makeStyles({
  root: {
   'max-width': '100%'
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
      maxWidth={'sm'}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{playList.name}</DialogTitle>
      <Grid containter spacing={24}>
        <Grid item xs={6} className={classes.first} onClick={clickFirst}>
          <SongCard></SongCard>
        </Grid>
        <Grid item xs={6} className={classes.second} onClick={clickSecond}>
          <SongCard></SongCard>
        </Grid>
      </Grid>
    </Dialog>
  );
}

SortDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};