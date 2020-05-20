import React, {Component} from "react";
import {Container, Responsive, Segment, Menu, Visibility, Button, Header} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import {Link} from "react-router-dom";
import UsersIndex from "../../components/UsersIndex";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class AdminHome extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('logged') || localStorage.getItem('role') !== 'admin') this.props.history.goBack()
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
                        <p>Click on the user's Name (big text) title to edit user</p>
                        <Button as={Link} to={'/user/new'}>Register a new User</Button>
                        <Header as={'h2'}>Users List</Header>
                        <UsersIndex/>
                    </Segment>
                </Segment.Group>
            </Responsive>
        );
    }
}

export default AdminHome;