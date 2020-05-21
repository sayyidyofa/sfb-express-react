import React, {Component} from "react";
import {Container, Responsive, Header, Form} from "semantic-ui-react";
import '../../../assets/fomantic/dist/semantic.css';
import Navbar from "../../../components/Navbar";
import Editor from 'for-editor';
import Swal from "sweetalert2";
import axios from "axios";
import {usersURL} from "../../../config";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class UserEdit extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged') || localStorage.getItem('role') !== 'admin') this.props.history.goBack()
        this.state = {
            name : '',
            password : '',
            username : ''
        }
    }

    getCurrentUser() {
        const user_id = this.props.match.params.id;
        axios({ method: 'get', url: usersURL+'/'+user_id, headers: {'Content-Type': 'application/json', 'token': localStorage.getItem('token')} })
            .then(data => {
                this.setState({name: data.data.name});
                this.setState({username: data.data.username});
            })
    }

    componentDidMount() {
        this.getCurrentUser();
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
        if(!name || !username){
            Swal.fire("Error","tidak boleh ada field yang kosong", "error");
        }else{
            const Header = {
                'Content-Type' : 'application/json',
                'token' : localStorage.getItem('token')
            }

            const Data = !password ? {name, username} : this.state;
            axios({
                method: 'put',
                url: usersURL+'/'+this.props.match.params.id,
                headers: Header,
                data: Data,
            }).then(data => {
                Swal.fire('User data successfully updated.')
            }).catch(err =>{
                alert(err);
            })
        }
    }

    handleDelete = () => {
        const user_id = this.props.match.params.id;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dd3333",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then(result=>{
            if (result.value) {
                axios({
                    method: 'delete',
                    url: usersURL+'/'+user_id,
                    headers: {'Content-Type' : 'application/json', 'token' : localStorage.getItem('token')}
                }).then(()=>Swal.fire("Deleted!",
                    "User has been deleted.",
                    "success").then(()=>{this.props.history.goBack()}))
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    "Cancelled",
                    "Your data is safe :)",
                    "error"
                )
            }
        });
    }

    render() {
        let {name, username} = this.state;
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Container>
                    <Navbar menus={[
                        ['/home/admin', 'Back to Dashboard'],
                        ['/logout', 'Logout']
                    ]}/>
                </Container>
                <Container>
                    <Header as={'h2'}>Edit an Existing User</Header>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Name' value={name} onChange={this.handleName}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder='Username' value={username} onChange={this.handleUsername}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password (Leave blank to keep it unchanged)</label>
                            <input onChange={this.handlePassword} type="password" autoComplete="new-password"/>
                        </Form.Field>
                        <Form.Button primary onClick={this.handleSubmit}>Edit User</Form.Button>
                        <Form.Button negative onClick={this.handleDelete}>Delete User</Form.Button>
                    </Form>
                </Container>
            </Responsive>
        );
    }
}

export default UserEdit;