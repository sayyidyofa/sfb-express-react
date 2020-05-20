import React, {Component} from "react";
import {Container, Responsive, Segment, Menu, Visibility, Button, Header} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import {Link} from "react-router-dom";
import PostsIndex from "../../components/PostsIndex";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class Landing extends Component {
    constructor(props) {
        super(props);
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
                                    <Button as={Link} to={'/login'} inverted={!fixed}>
                                        Log in
                                    </Button>
                                    <Button as={Link} to={'/signup'} inverted={!fixed} primary={fixed}
                                            style={{marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                    <Segment>
                        <PostsIndex isPublic={true}/>
                    </Segment>
                </Segment.Group>
            </Responsive>
        );
    }
}

export default Landing;