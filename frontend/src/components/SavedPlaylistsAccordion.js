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
import SortDialog from './SortDialog';
import axios from 'axios';

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
  const [open, setOpen] = React.useState(false);
  const [tracks, setTracks] = React.useState([])
  const [data, setData] = React.useState([]);

  const classes = useStyles();

  React.useEffect(() => {}, [JSON.stringify(props)]);

  const handleClickOpen = () => {
    const fetchData = async () => {
      var url = 'http://127.0.0.1:8000/api/playlist-info/'
      url = url.concat(props.playlist.playlist_id)
      const result = await axios(url);
      setData(result.data[0]['items'])
      //console.log(result.data[0]['items'])
      setTracks(result.data[0]['items']['tracks']);
      setOpen(true);
    };
    fetchData();
    //setOpen(true);
  };

  const handleExport = () => {
    const fetchData = async () => {
      var url = 'http://127.0.0.1:8000/api/playlist-info/'
      url = url.concat(props.playlist.playlist_id)
      const result = await axios(url);
      const tracks = result.data[0]['items']['tracks']
      setTracks(tracks)
      var p1 = new Promise((resolve, reject) => {
        tracks.forEach((cur_track, index) => {
          var url = 'http://127.0.0.1:8000/spotify/rearrange-playlist/'
          url = url.concat(props.playlist.playlist_id)
          url = url.concat("/", index)
          url = url.concat("/", "1")
          url = url.concat("/", cur_track['sort_order'])
          axios.put(url)
          setTimeout(function(){},1000)
    
        })
        setTimeout(function(){ resolve('Finished!'); },3000)
      });
      p1.then(value =>{
        console.log(value)
        var url = 'http://127.0.0.1:8000/spotify/get-playlist-info/'
        url = url.concat(props.playlist.playlist_id)
        fetch(url).then(response => response.json()).then((data) => {
          var item = {
            playlist_id: data['id'],
            items: data
          }
          var api_url = 'http://127.0.0.1:8000/api/playlist-info/'
          api_url = api_url.concat(props.playlist.playlist_id)
          axios.post(api_url, item)
          console.log(value, item)
        });
      }, reason => {console.error(reason)});

    };
    fetchData();
  };

  const handleClose = (value) => {
    setOpen(false);
  };

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
              onClick={handleClickOpen}
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
              onClick={handleExport}
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
          {//console.log(props.playlist.name)
          }
        </AccordionSummary>
        <AccordionDetails>
          <SortDialog data={data} setData={setData} tracks={tracks} setTracks={setTracks} playList={props.playlist} open={open} onClose={handleClose} selectedValue={"none"}/>
          <Typography>Number of tracks = {props.playlist.tracks_total}</Typography>
        </AccordionDetails>
        {tracks.length !== 0 && tracks.map((track, index) => {
        return <AccordionDetails>
            <Typography align="left">{index+1}. {track['track_name']}</Typography>
        </AccordionDetails>
        })}
      </Accordion>
    </div>
  );
}