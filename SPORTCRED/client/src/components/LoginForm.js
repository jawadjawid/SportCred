import React from 'react';
import Button from '@material-ui/core/Button';
import { register } from '../backendConnector/signup';
import FormTextField from './FormTextField';


//import { styles } from './style';
//import { withStyles } from '@material-ui/core';
import {
    Container, Col, Form,
} from 'reactstrap';

class ReviewRegister extends React.Component {

    constructor(props) {
        super(props);

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        this.state = {
            username: (username) ? username : '',
            password: (password) ? password : '',
        };
    }

    render() {
        const { username, password } = this.state;

    return (
        <Container className="App">
            <h2>Sign In</h2>
            <Form className="form">
                <Col>
                    <FormTextField
                        variant="outlined"
                        margin="normal"
                        name="username"
                        label="Username"
                        type="name"
                        value={username}
                        comp={this}
                    />
                </Col>
                <Col>
                    <FormTextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        comp={this}
                    />
                </Col>
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => register(this)}
                >
                    Register
                </Button>
            </Form>
        </Container>
    );}}
export default ReviewRegister;
