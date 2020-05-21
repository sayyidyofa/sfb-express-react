import React, {Component} from "react";
import {Container, Responsive, Header, Form} from "semantic-ui-react";
import '../../../assets/fomantic/dist/semantic.css';
import Navbar from "../../../components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import {usersURL} from "../../../config";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class UserCreate extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged') || localStorage.getItem('role') !== 'admin') this.props.history.goBack()
        this.state = {
            name : '',
            password : '',
            username : ''
        }
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

    handleSubmit = () => {
        const {name, username, password} = this.state;
        if(!name || !username || !password){
            Swal.fire("Error","tidak boleh ada field yang kosong", "error");
        }else{
            const Header = {
                'Content-Type' : 'application/json',
                'token' : localStorage.getItem('token')
            }

            const Data = this.state;
            axios({
                method: 'post',
                url: usersURL,
                headers: Header,
                data: Data,
            }).then(data => {
                Swal.fire('User successfully registered with id: '+ data.data.id).then(()=>{this.props.history.goBack()})
            }).catch(err =>{
                alert(err);
            })
        }
    }

    render() {
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Container>
                    <Navbar menus={[
                        ['/home/admin', 'Back to Dashboard'],
                        ['/logout', 'Logout']
                    ]}/>
                </Container>
                <Container>
                    <Header as={'h2'}>Register a New User</Header>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Name' onChange={this.handleName} autoComplete="off"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder='Username' onChange={this.handleUsername} autoComplete="off"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input onChange={this.handlePassword} type="password" autoComplete="new-password"/>
                        </Form.Field>
                        <Form.Button primary onClick={this.handleSubmit}>Create User</Form.Button>
                    </Form>
                </Container>
            </Responsive>
        );
    }
}

export default UserCreate;