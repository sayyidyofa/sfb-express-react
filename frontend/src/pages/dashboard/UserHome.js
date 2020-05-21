import React, {Component} from "react";
import {Container, Responsive, Button, Header} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import {Link} from "react-router-dom";
import PostsIndex from "../../components/PostsIndex";
import Navbar from "../../components/Navbar";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class UserHome extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged')) this.props.history.push('/login');
        localStorage.getItem('role') === 'admin' ? this.menus.push(['/home/admin', 'Manage Users'], ['/logout', 'Logout']) : this.menus.push(['/logout', 'Logout']);
    }

    menus = [];

    render() {
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                    <Container>
                        <Navbar menus={this.menus}/>
                    </Container>
                    <Container>
                        <Header as={'h3'}>Welcome back, {localStorage.getItem('username')} !</Header>
                        <p>Click on the post title to edit post</p>
                        <Button as={Link} to={'/post/new'}>Create a New Post</Button>
                        <Header as={'h2'}>Posts by You</Header>
                        <PostsIndex isPublic={false}/>
                    </Container>
            </Responsive>
        );
    }
}

export default UserHome;