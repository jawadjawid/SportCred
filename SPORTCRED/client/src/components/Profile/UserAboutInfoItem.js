import React from 'react';
import Grid from '@material-ui/core/Grid'


export default function UserAboutInfoItem(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                {props.prompt}
            </Grid>
            <Grid item xs={6}>
                {props.answer}
            </Grid>
        </Grid>);
}