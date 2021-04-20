import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 150,
  },
  media: {
    height: 300,
  },
});

export default function SongCard(props) {
  const classes = useStyles();
  // For now the song is just an object. 
  const song = {
      "songName"  : props.song['track_name'],
      "artistName": props.song['artist'],
      "albumArt"  : props.song['image_300'],
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={song.albumArt}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {song.artistName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {song.songName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          This is where the player will go.
        </Button>
      </CardActions>
    </Card>
  );
}