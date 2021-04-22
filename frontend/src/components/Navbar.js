import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";

import LoginDialog from "./LoginDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: "none",
    padding: "20px",
    color: theme.palette.secondary.main,
    "&:hover": {
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [isUserPage, setUserPage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAccountLogout = () => {
    setAnchorEl(null);
    setUserPage(false);
  };

  useEffect(() => {
    if(location['pathname'] === '/user'){
      setUserPage(true);
    }
  }, [location]);

  if (!isUserPage) {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              Merge Sort Music
            </Typography>
            <div className={classes.flexGrow}></div>
            <LoginDialog
              isUserPage={isUserPage}
              setUserPage={setUserPage}
            ></LoginDialog>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              Merge Song Sort
            </Typography>
            <div className={classes.flexGrow}></div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleAccountClick}
              aria-label="account"
            >
              <PersonIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/account"
                onClick={handleMenuClose}
              >
                My account
              </MenuItem>
              <MenuItem component={Link} to="/" onClick={handleAccountLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
