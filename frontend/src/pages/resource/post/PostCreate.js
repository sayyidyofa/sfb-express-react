import React, {Component} from "react";
import {Container, Responsive, Header, Form} from "semantic-ui-react";
import '../../../assets/fomantic/dist/semantic.css';
import Navbar from "../../../components/Navbar";
import Editor from 'for-editor';
import Swal from "sweetalert2";
import axios from "axios";
import {postsURL} from "../../../config";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class PostCreate extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged')) this.props.history.push('/login')
        this.state = {
            title: '',
            content: ''
        }
    }

    handleTitle = (e) => {
        var values = e.target.value;
        if(values !== ""){
            this.setState({
                messageErrorTitle : ''
            })
        }

        this.setState({
            title : e.target.value
        })

    }

    handleContent(value) {
        this.setState({
            content: value
        })
    }

    handleSubmit = () => {
        const {title, content} = this.state;
        console.log(this.state);
        if(!title || !content){
            Swal.fire("Error","tidak boleh ada field yang kosong", "error");
        }else{
            const Header = {
                'Content-Type' : 'application/json',
                'token' : localStorage.getItem('token')
            }

            const Data = this.state;
            axios({
                method: 'post',
                url: postsURL,
                headers: Header,
                data: Data,
            }).then(data => {
                console.log(data.data)
                // window.location.href = '/';
                Swal.fire('Content successfully posted.').then(()=>{this.props.history.goBack()})
                // this.props.history.push('/login')
            }).catch(err =>{
                alert(err);
            })
        }
    }

    render() {
        let {content} = this.state;
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Container>
                    <Navbar menus={[
                        ['/home/user', 'Back to Dashboard'],
                        ['/logout', 'Logout']
                    ]}/>
                </Container>
                <Container>
                    <Header as={'h2'}>Create a New Post</Header>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input placeholder='Post Title' onChange={this.handleTitle} autoComplete="off"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Post Content&nbsp;&nbsp;</label>
                            <Editor
                                autoComplete={false}
                                value={content}
                                onChange={content => this.handleContent(content)}
                                placeholder={"Write your content"}
                                language={"en"}
                                toolbar={{
                                    img: false,
                                    h1: true,
                                    h2: true,
                                    h3: true,
                                    preview: true,
                                    link: true,
                                    code: true,
                                    expand: true,
                                    save: false
                                }}/>
                        </Form.Field>
                        <Form.Button primary onClick={this.handleSubmit}>Post!</Form.Button>
                    </Form>
                </Container>
            </Responsive>
        );
    }
}

export default PostCreate;