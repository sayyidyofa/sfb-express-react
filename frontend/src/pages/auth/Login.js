import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import {Button, Form, Message} from "semantic-ui-react";
import Layout from "./Layout";
import { authURL, usersURL } from "../../config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsername = (e) => {
        var values = e.target.value;
        if (values !== "") {
            this.setState({
                messageErrorUsername: ''
            })
        }

        this.setState({
            username: e.target.value
        })

    }

    handlePassword = (e) => {
        var valuesPassword = e.target.value;
        if (valuesPassword !== "") {
            this.setState({
                messageErrorPassword: ''
            })
        }
        this.setState({
            password: e.target.value
        })
    }

    onHandleSubmit = () => {
        var username = this.state.username;
        var password = this.state.password;
        if (username === null || username === "" || username === undefined || password === null || password === "" || password === undefined) {
            Swal.fire("Error", "Username atau password tidak boleh kosong!", "error");
            //alert('username tidak boleh kosong')
        }
        else if ((username !== null && username !== "" && username !== undefined) && (password !== null && password !== "" && password !== undefined
        )) {
            const Header = {
                'Content-Type': 'application/json'
            }

            const Data = {
                username: this.state.username,
                password: this.state.password,
            }

            axios({
                method: 'post',
                url: authURL + '/login',
                headers: Header,
                data: Data,
            }).then(data => {
                console.log(data.data)
                var token = data.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("logged", true);
                this.setState({
                    logged: true
                })
                // window.location.href = '/';
                //this.props.history.push('/absensi/listallabsen')
            })
                .then(data => {
                    const value = localStorage.getItem('token');

                    const Headers = {
                        'Content-Type': 'application/json',
                        'token': value,
                    }
                    axios({
                        method: 'get',
                        url: usersURL + '/me',
                        headers: Headers,
                    }).then(data => {
                        var Role = data.data.role;
                        var Username = data.data.username;

                        if (Username !== null && Username !== undefined) {
                            localStorage.setItem("username", Username);
                        }
                        if (Role !== null && Role !== undefined) {
                            localStorage.setItem("role", Role);
                        }
                    })
                        .then(data => {
                            if (localStorage.getItem('role') === 'admin') {
                                this.props.history.push('/home/admin')
                            } else {
                                this.props.history.push('/home/user')
                            }
                        })
                        .catch(err => {
                            console.log('errornya : ' + err)
                        })
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire("Error", "username atau password tidak ditemukan", "error")
                });
        }


    }

    render() {
        return (
            <Layout header="Dashboard Log in">
                <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    className="auth-input-field"
                    onChange={this.handleUsername}
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    className="auth-input-field"
                    onChange={this.handlePassword}
                />

                <Button color="teal" fluid size="huge" onClick={this.onHandleSubmit}>
                    Login
                </Button>

                <Message size="big">
                    <Link to="/signup">Not Registered?</Link>
                </Message>
            </Layout>
        );
    }
}

export default Login;