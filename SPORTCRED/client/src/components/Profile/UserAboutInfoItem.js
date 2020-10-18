import React from 'react';
import Grid from '@material-ui/core/Grid'
import EditableText from "./EditText";


export default function UserAboutInfoItem(props) {

    const [answer, setAnswer] = React.useState(props.answer)

    return <Grid container spacing={0}>
        <Grid item xs={6}><b>
            {props.prompt}
        </b>
        </Grid>
        <Grid item xs={6}>
            {answer}
        </Grid>
    </Grid>

}