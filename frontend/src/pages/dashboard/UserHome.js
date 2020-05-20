import React, {Component} from "react";
import {Container, Responsive, Segment, Menu, Visibility, Button, Header} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import {Link} from "react-router-dom";
import PostsIndex from "../../components/PostsIndex";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class UserHome extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged')) this.props.history.push('/login')
    }

    render() {
        const {children} = this.props
        const {fixed} = true
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Segment.Group>
                    <Segment
                        inverted
                        textAlign='center'
                        vertical>
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item position='left'>
                                    <Header as='h1' inverted={true}>Simple Flat Blog</Header>
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as={Link} to={'/logout'} inverted={!fixed}>
                                        Logout
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                    <Segment>
                        <Header as={'h3'}>Welcome back, {localStorage.getItem('username')} !</Header>
                        <p>Click on the post title to edit post</p>
                        <Button as={Link} to={'/post/new'}>Create a New Post</Button>
                        <Header as={'h2'}>Posts List</Header>
                        <PostsIndex isPublic={false}/>
                    </Segment>
                </Segment.Group>
            </Responsive>
        );
    }
}

export default UserHome;