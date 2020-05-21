import React, {Component} from "react";
import {Container, Responsive, Button, Header} from "semantic-ui-react";
import '../../assets/fomantic/dist/semantic.css';
import {Link} from "react-router-dom";
import UsersIndex from "../../components/UsersIndex";
import Navbar from "../../components/Navbar";

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
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                    <Container>
                        <Navbar menus={[
                            ['/home/user', 'Manage your Posts'],
                            ['/logout', 'Logout']
                        ]}/>
                    </Container>
                    <Container>
                        <Header as={'h3'}>Welcome back, {localStorage.getItem('username')} !</Header>
                        <p>Click on the user's Name (big text) title to edit user</p>
                        <Button as={Link} to={'/user/new'}>Register a new User</Button>
                        <Header as={'h2'}>Users List</Header>
                        <UsersIndex/>
                    </Container>
            </Responsive>
        );
    }
}

export default AdminHome;