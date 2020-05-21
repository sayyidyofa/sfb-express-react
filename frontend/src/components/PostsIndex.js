import React, { Component } from 'react';
import { postsURL, usersURL } from "../config";
import axios from 'axios';
import '../assets/fomantic/dist/semantic.css';
import { Item } from "semantic-ui-react";

class PostsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.getPosts(this.props.isPublic ? postsURL : usersURL);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getPosts(this.props.isPublic ? postsURL : usersURL);
    }

    getPosts(url) {
        /*const data = this.props.isPublic
            ? useQuery({url: url, headers: {'Content-Type': 'application/json'}})
            : useQuery({url: url+'/me', headers: {'Content-Type': 'application/json', 'token': localStorage.getItem('token')}}).posts;
        this.setState({posts: data});*/
        this.props.isPublic
            ? axios({ method: 'get', url: url, headers: {'Content-Type': 'application/json'} })
                    .then(data => { this.setState({posts: data.data}) })
            : axios({ method: 'get', url: url+'/me', headers: {'Content-Type': 'application/json', 'token': localStorage.getItem('token')} })
                .then(data => { this.setState({posts: data.data.posts}) })
    }

    componentDidMount() {
        this.getPosts(this.props.isPublic ? postsURL : usersURL);
    }

    render() {
        return (
            <Item.Group>
                {this.state.posts.length === 0 ? <p>There are no posts saved with your identity. Go make one</p> :
                    this.state.posts.map((post, index)=>{
                    return <Item key={index}>
                        <Item.Content>
                            <Item.Header as={'a'} href={window.location.href.replace('/home/user', '/') + (this.props.isPublic ? 'post/'+post._id : 'post/'+post._id+'/edit')}> { post.title } </Item.Header>
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