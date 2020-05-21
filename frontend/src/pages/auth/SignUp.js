import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { authURL } from "../../config";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "./Layout";
import Swal from "sweetalert2";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            name : '',
            password : '',
            username : ''
        };

    }
    handleUsername = (e) => {
        var values = e.target.value;
        if(values !== ""){
            this.setState({
                messageErrorUsername : ''
            })
        }

        this.setState({
            username : e.target.value
        })

    }

    handleName = (e) => {
        var values = e.target.value;
        if(values !== ""){
            this.setState({
                messageErrorUsername : ''
            })
        }

        this.setState({
            name : e.target.value
        })

    }

    handlePassword = (e) => {
        var valuesPassword = e.target.value;
        if(valuesPassword !== ""){
            this.setState({
                messageErrorPassword : ''
            })
        }
        this.setState({
            password : e.target.value
        })
    }

    onHandleSubmit = () => {
        var username = this.state.username;
        var password = this.state.password;
        var name = this.state.name;
        if(!username || !password || !name ){
            Swal.fire("Error","tidak boleh ada kolom yang kosong", "error");
        }else{
            const Header = {
                'Content-Type' : 'application/json'
            }

            const Data = {
                username : this.state.username,
                password : this.state.password,
                name : this.state.name
            }
            axios({
                method: 'post',
                url: authURL + '/register',
                headers: Header,
                data: Data,
            }).then(data => {
                console.log(data.data)
                // window.location.href = '/';
                Swal.fire('Account is successfully registered!\nYou will be redirected to Login page')
                this.props.history.push('/login')
            }).catch(err =>{
                alert(err);
            })
        }
    }

    render() {
        return (
            <Layout header="Sign up to get started">
                <Form.Input
                    fluid
                    icon="address card outline"
                    iconPosition="left"
                    placeholder="Your name"
                    className="auth-input-field"
                    onChange={this.handleName}
                />
                <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Your username"
                    className="auth-input-field"
                    onChange={this.handleUsername}
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Your password"
                    type="password"
                    className="auth-input-field"
                    onChange={this.handlePassword}
                />

                <Button color="teal" fluid size="huge" onClick={this.onHandleSubmit}>
                    Sign up
                </Button>

                <Message size="big">
                    <Link to="/login">Already Registered?</Link>
                </Message>
            </Layout>
        )
    }
}
export default Signup;