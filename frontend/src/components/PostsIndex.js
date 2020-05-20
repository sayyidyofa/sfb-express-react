import React, { Component } from 'react';
import { postsURL } from "../config";
import axios from 'axios';
import '../assets/fomantic/dist/semantic.css';
import {Container, Header, Item } from "semantic-ui-react";
import {Link} from "react-router-dom";

class PostsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.getPosts(postsURL);
    }

    getPosts(url) {
        axios({ method: 'get', url: url, headers: {'Content-Type': 'application/json'} })
            .then(data => { this.setState({posts: data.data}) })
    }

    render() {
        return (
            <Item.Group>
                {this.state.posts.map((post, index)=>{
                    return <Item key={index}>
                        <Item.Content>
                            <Item.Header as={Link} to={this.props.isPublic ? 'post/'+post._id : 'post/'+post._id+'/edit'}> { post.title } </Item.Header>
                            <Item.Meta> Created at: {post.createdAt} </Item.Meta>
                            <Item.Extra> Updated at: {post.updatedAt} </Item.Extra>
                        </Item.Content>
                    </Item>;
                })}
            </Item.Group>
        );
    }
}

export default PostsIndex;