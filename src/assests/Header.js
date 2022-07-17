import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GamesIcon from '@mui/icons-material/Games';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


//this is for theme chnaging
const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function Header() {
  const [light, setLight] = useState(true);
  return (
    <div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        bgcolor: '#96bba9',
        borderRadius: 1,
      }}>
        <AppBar position="static">
          <Toolbar sx={{ bgcolor: "#96bba9" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, bgcolor: "#96bba9" }}
            >
              <GamesIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, bgcolor: "#96bba9", fontFamily: 'Monospace' }}
              className="heading"
            >
              GAMING PROJECT
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

    {/* theme chnaging options */}
      <MuiThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Button className="theme" sx={{ dispaly: "flex", alignItems: "center", fontFamily: 'Monospace' }} onClick={() => setLight(prev => !prev)}>Click to <br />Change theme</Button>
      </MuiThemeProvider>
    </div>
  );
}
