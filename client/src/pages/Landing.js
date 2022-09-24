import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../authService/authService";

import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { Grid } from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Signup from "../components/Entry/Signup";
import Login from '../components/Entry/Login'
import SideImage from "../components/Entry/SideImage";

// import {theme} from '../themes/theme'

const Landing = (props) => {
  const [switchEntry, setSwitchEntry] = useState(true);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();
  
  const theme = createTheme({
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: 14,
      button: {
        textTransform: "none",
        letterSpacing: 0,
        fontWeight: "bold",
      },
    },
    overrides: {
      MuiInput: {
        input: {
          fontWeight: "bold",
        },
      },
    },
    palette: {
      primary: { main: "#ffb8b0" },
      secondary: { main: "#B0B0B0" },
    },
  });

  const changeEntry = () => {
    setSwitchEntry(!switchEntry);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setStatus("Please include username and password");
      } else {
        let response = await post("/users/login", {
          username: username,
          password: password,
        });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/my-profile");
      }
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <SideImage item />
        {switchEntry ? (
          <Login
            user={props.user}
            register={props.register}
            login={login}
            setErrorMessage={props.setErrorMessage}
            status={status}
            setUsername={setUsername}
            setPassword={setPassword}

            changeEntry={changeEntry}
          />
        ) : (
          <Signup
            register={props.register}
            login={props.login}
            setErrorMessage={props.setErrorMessage}
            changeEntry={changeEntry}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Landing;
