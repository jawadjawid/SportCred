import {Redirect} from "react-router";
import React from "react";

export const register = (registerComp) => {
    const request = new Request('http://localhost:5000/api/profile/signup', {
        method: 'post',
        body: JSON.stringify(registerComp.state),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    registerComp.setState({
        dateOfBirthError: false,
        phoneError: false,
        passwordError: false,
        fullNameError: false,
        emailError: false,
        usernameError: false
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status == 200) {
                registerComp.setState({
                    redirect: true
                });
            } else {
                registerComp.setState({
                });
            }
            return res.json();
        })
        .then(json => {
            console.log(json.error.errors);
            if (json.error.errors.dateOfBirth != undefined) {
                registerComp.setState({
                    dateOfBirthError: true
                });
            }
            if (json.error.errors.email != undefined) {
                registerComp.setState({
                    emailError: true
                });
            }
            if (json.error.errors.fullName != undefined) {
                registerComp.setState({
                    fullNameError: true
                });
            }
            if (json.error.errors.password != undefined) {
                registerComp.setState({
                    passwordError: true
                });
            }
            if (json.error.errors.phone != undefined) {
                registerComp.setState({
                    phoneError: true
                });
            }
            if (json.error.errors.username != undefined) {
                registerComp.setState({
                    usernameError: true
                });
            }
        })
        .catch(() => {
            registerComp.setState({
                errorMessage: "Error, Please try again",
            });
        });
};