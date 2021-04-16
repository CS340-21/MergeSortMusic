import React from 'react';
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
  const [ selected, setSelected ] = React.useState(false);
  const short = 1000;
  const long  = 2000;
  let first  = short;
  let second = long;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const clickFirst = () => {
    setSelected((prev) => !prev);
    first  = long;
    second = short;
  }

  const clickSecond = () => {
    setSelected((prev) => !prev);
    first  = short;
    second = long;
  }

  const handleChange = () => {
    setSelected((prev) => !prev);
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
     <DialogContent style={{ overflow: "hidden"}}>
     <FormControlLabel
        control={<Switch selected={selected} onChange={handleChange} />}
        label="Show"
      />
        <Grid container spacing={1} className={classes.grid}>
          <Grid container item xs={12} spacing={0}>
            <Fade in={selected} timeout={first}>
              <Grid item xs={6} className={classes.first} onClick={clickFirst}>
                
                  <SongCard></SongCard>
                
              </Grid>
            </Fade>
            <Fade in={selected} timeout={second}>
              <Grid item xs={6} className={classes.first} onClick={clickSecond}>
                
                  <SongCard></SongCard>
                
              </Grid>
            </Fade>
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