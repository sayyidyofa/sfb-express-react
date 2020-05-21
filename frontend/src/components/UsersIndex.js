import React, { Component } from 'react';
import { usersURL } from "../config";
import axios from 'axios';
import '../assets/fomantic/dist/semantic.css';
import { Item } from "semantic-ui-react";
import {Link} from "react-router-dom";

class UsersIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.getPosts(usersURL);
    }

    getPosts(url) {
        axios({ method: 'get', url: url, headers: {'Content-Type': 'application/json', 'token': localStorage.getItem('token')} })
            .then(data => { this.setState({users: data.data}) })
    }

    render() {
        return (
            <Item.Group>
                {this.state.users.map((user, index)=>{
                    return <Item key={index}>
                        <Item.Content>
                            <Item.Header as={'a'} href={window.location.href.replace('/home/admin', '/') + 'user/'+user.id+'/edit'}> { user.name } </Item.Header>
                            {/*<Item.Description>Username: {user.username}</Item.Description>*/}
                            <Item.Meta> Created at: {user.createdAt} </Item.Meta>
                            <Item.Extra> Updated at: {user.updatedAt} </Item.Extra>
                        </Item.Content>
                    </Item>;
                })}
            </Item.Group>
        );
    }
}

export default UsersIndex;