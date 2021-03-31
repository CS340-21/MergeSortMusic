import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const dark = createMuiTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
    secondary: {
      main: "#222326",
    },
    text: {
      main: "#fff",
    }
  }
})

export const light = createMuiTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
    secondary: {
      main: "#fff",
    },
    text: {
      main: "#222326",
    }
  }
})