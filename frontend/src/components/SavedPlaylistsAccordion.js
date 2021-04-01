import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { dark } from '../theme';

const useStyles = makeStyles((dark) => ({
  root: {
    width: '50%',
    margin: "auto",
    backgroundColor: "#222326",
  },
  heading: {
    fontSize: dark.typography.pxToRem(15),
    fontWeight: dark.typography.fontWeightRegular,
    marginTop: "auto",
    marginBottom: "auto",
  },
  playlist: {
    margin: "5px"
  },
  export_button: {
    flex: "left",
  },
  edit_button: {
    flex: "left",
    color: dark.palette.primary.main,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.playlist}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <FormControlLabel
          aria-label="Edit"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          color={dark.palette.primary.main}
          control={
            <Button 
              variant="contained"
              style={{
                minWidth: "15%", 
                color: "#222326",
                backgroundColor: "#1db954",
            }}
            >
              Edit
            </Button>
          }
          />
          <FormControlLabel
          aria-label="Export"
          className={classes.export_button}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={
            <Button 
              variant="contained"
              style={{
                minWidth: "15%", 
                color: "#222326",
                backgroundColor: "#1db954",
            }}
            >
              Export
            </Button>
          }
          />
          <Typography className={classes.heading}>{props.playlist.name}</Typography>
          {console.log(props.playlist.name)}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Number of tracks = {props.playlist.tracks_total}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}