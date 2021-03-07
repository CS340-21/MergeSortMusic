import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function HomePage(props) {
  const [roomCode,setRoomCode] = useState(null);
  const history = useHistory();

  useEffect(async () => {
    fetch("/api/user-in-room")
      .then(response => response.json())
      .then(data => {
        setRoomCode(data.code);
        if (roomCode !== null) {
          history.push(`/room/${roomCode}`);
        }
      });
  });

  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12}>
        <Typography variant="h3" compact="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
