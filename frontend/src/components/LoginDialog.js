import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import {
  Button,
  TextField,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import AccountBoxIcon from '@material-ui/icons/AccountBox';

import "./Navbar.js";

export default function LoginDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let history = useHistory();
  const user = {
    username: username,
    password: password,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSignUp = () => {
    axios.post('http://127.0.0.1:8000/login/', user)
    setOpen(false);
    props.setUserPage(true);
    history.push('/user')
  };

  const handleLogin = () => {
    axios.get('http://127.0.0.1:8000/login/')
    .then((response) => {
    let result = response.data.filter(item => item.username === user.username && item.password === user.password);
    if(result.length === 0){
      alert("Username or Password incorrect. Try Again or Sign Up");
    }else{
      console.log("Here")
      setOpen(false);
      props.setUserPage(true);
      history.push('/user')
    }
  });
  };

  return (
    <div>
      <ListItem
        button
        key={"Login of Create Account"}
        onClick={handleClickOpen}
        style={{ color: "black" }}
      >
        <ListItemText primary={"Login or Create Account"} />
        <AccountBoxIcon />
      </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Login or Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thanks for using Merge Sort Music!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            required="true"
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            required="true"
            color="black"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            //onClick={handleLogin.bind(this)}
            color="black"
          >
            Login
          </Button>
          <Button
            //onClick={handleSignUp.bind(this)}
            color="black"
          >
            Sign Up
          </Button>
          <Button onClick={handleClose} color="black">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}