import React, {Component} from "react";
import {Responsive, Header, Container} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import PostsIndex from "../../components/PostsIndex";
import Navbar from "../../components/Navbar";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class Landing extends Component {

    render() {
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Container>
                    <Navbar menus={[
                        ['/login', 'Login'],
                        ['/signup', 'Sign Up']
                    ]}/>
                </Container>
                <Container style={{ marginTop: '2em' }}>
                    <Header as={'h2'}>Posts List</Header>
                    <PostsIndex isPublic={true}/>
                </Container>
            </Responsive>
        );
    }
}

export default Landing;