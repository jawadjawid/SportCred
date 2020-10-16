import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { handleFormField } from './utils';


class FormTextField extends React.Component {

    render() {
        const { name, label, type, displayError, comp, errorMessage, margin, variant, value } = this.props;

        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <TextField
                        margin={margin}
                        variant={variant}
                        required
                        fullWidth
                        id={name}
                        name={name}
                        label={label}
                        type={type}
                        error={displayError}
                        helperText={errorMessage}
                        value={value}
                        onChange={(event) => handleFormField.bind(comp)(name, event)}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default FormTextField;
