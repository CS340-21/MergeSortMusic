import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

export default function RoomJoinPage(props) {
  const [roomCode,setRoomCode] = useState("");
  const [errorMsg,setErrorMsg] = useState("");

  const handleTextFieldChange = e => {
    setRoomCode(e.target.value);
  }

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then(response => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          setErrorMsg("Room not found.");
        }
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      });
  }

  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={errorMsg.length > 0}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={errorMsg}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
