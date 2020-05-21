import React, { Component } from 'react'
import { Container, Header, Icon } from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import axios from "axios";
import { postsURL } from "../../config";
import ReactMarkdown from "react-markdown";
import Navbar from "../../components/Navbar";

class ShowPost extends Component {
    state = {
        post: {}
    }

    getPost = () => {
        const post_id = this.props.match.params.id;
        axios({ method: 'get', url: postsURL+'/'+post_id, headers: {'Content-Type': 'application/json'} })
            .then(data => {
                this.setState({post: data.data});
            })
        //return post_id;
    }

    constructor(props) {
        super(props);
        this.getPost();
        //console.log(this.getPost())
    }

    render() {
        return (
            <div>
                <Navbar menus={
                    [
                        ['/login', 'Login'],
                        ['/signup', 'Sign Up']
                    ]
                }/>
                <Container text style={{ marginTop: '2em' }}>
                    <Header as='h1'>{this.state.post.title}</Header>
                    <Icon name="user"/>&nbsp;{this.state.post.author}
                    <br/>
                    <Icon name="calendar alternate"/>&nbsp;{this.state.post.updatedAt}
                </Container>
                <Container text style={{ marginTop: '1em' }}>
                    <ReactMarkdown source={this.state.post.content}/>
                </Container>
            </div>
        );
    }
}

export default ShowPost;