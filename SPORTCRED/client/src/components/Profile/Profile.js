import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import UserBasicInfo from "./UserBasicInfo";


const theme1 = createMuiTheme({
    palette: {
        primary: {
            light: '#6b6e70',
            main: '#474b4f',
            dark: '#222629',
            contrastText: '#fff',
        },
        secondary: {
            light: '#86c232',
            main: '#61892f',
            dark: '#222629',
            contrastText: '#fff',
        },
        type:'dark'
    }, typography: {
        h1:{
            fontSize:'1.5rem',
            marginBottom:'1.0rem'
        },
        h2:{
            fontSize:'1.5rem'
        }
    }
});

export default function Profile() {
    return (
        <ThemeProvider theme={theme1}>
            <AppBar position="static" style={{"margin-bottom":"1rem",padding:"1.5rem"}}>
            </AppBar>
            <CssBaseline/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <UserBasicInfo />
                </Grid>
                <Grid item xs={9}>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

