export const register = (registerComp) => {
    const request = new Request('http://localhost:5000/api/profile/signup', {
        method: 'post',
        body: JSON.stringify(registerComp.state),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            return res;
        })
        .then(json => {
            if (json.status == 200) {
                registerComp.setState({
                    errorMessage: "Success",
                    displayError: false
                });
            } else {
                registerComp.setState({
                    errorMessage: "Error, Please try again",
                    displayError: true
                });
            }
        })
        .catch(() => {
            registerComp.setState({
                errorMessage: "Error, Please try again",
                displayError: true
            });
        });
};