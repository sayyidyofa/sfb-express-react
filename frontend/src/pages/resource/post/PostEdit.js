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

class PostEdit extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged')) this.props.history.push('/login')
        this.state = {
            title: '',
            content: ''
        }
    }

    getCurrentPost() {
        const post_id = this.props.match.params.id;
        axios({ method: 'get', url: postsURL+'/'+post_id, headers: {'Content-Type': 'application/json'} })
            .then(data => {
                this.setState({title: data.data.title});
                this.setState({content: data.data.content});
            })
    }

    componentDidMount() {
        this.getCurrentPost();
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
                method: 'put',
                url: postsURL+'/'+this.props.match.params.id,
                headers: Header,
                data: Data,
            }).then(data => {
                console.log(data.data)
                // window.location.href = '/';
                Swal.fire('Content successfully updated.')
                // this.props.history.push('/login')
            }).catch(err =>{
                alert(err);
            })
        }
    }

    handleDelete = () => {
        const post_id = this.props.match.params.id;
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
                    url: postsURL+'/'+post_id,
                    headers: {'Content-Type' : 'application/json', 'token' : localStorage.getItem('token')}
                }).then(()=>Swal.fire("Deleted!",
                    "Data has been deleted.",
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
        let {title, content} = this.state;
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Container>
                    <Navbar menus={[
                        ['/home/user', 'Back to Dashboard'],
                        ['/logout', 'Logout']
                    ]}/>
                </Container>
                <Container>
                    <Header as={'h2'}>Edit an Existing Post</Header>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input placeholder='Post Title' value={title} onChange={this.handleTitle}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Post Content&nbsp;&nbsp;</label>
                            <Editor
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
                        <Form.Button primary onClick={this.handleSubmit}>Edit!</Form.Button>
                        <Form.Button negative onClick={this.handleDelete}>Delete this post</Form.Button>
                    </Form>
                </Container>
            </Responsive>
        );
    }
}

export default PostEdit;