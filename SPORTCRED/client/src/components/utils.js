export function handleFormField(field, event) {
    if (this.state.displayError !== undefined) {
        this.setState({
            [field]: event.target.value,
            displayError: false,
            errorMessage: ''
        });
    } else {
        this.setState({
            [field]: event.target.value,
        });
    }
}


