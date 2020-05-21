import React, {Component} from "react";
import {Container, Menu, Visibility, Image} from "semantic-ui-react";
import '../assets/fomantic/dist/semantic.css';
import logo from "../logo.svg";
import {Link} from "react-router-dom";

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '0em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

export default class Navbar extends Component {
    state = {
        menuFixed: false,
        overlayFixed: false
    }

    stickTopMenu = () => this.setState({ menuFixed: true })

    unStickTopMenu = () => this.setState({ menuFixed: false })

    render() {
        const { menuFixed } = this.state
        return (
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                <Menu
                    borderless
                    fixed={menuFixed ? 'top' : undefined}
                    style={menuFixed ? fixedMenuStyle : menuStyle}
                >
                    <Container text>
                        <Menu.Item>
                            <Image size='mini' src={logo} />
                        </Menu.Item>
                        <Menu.Item header position="left" as={Link} to={"/"}>Simple Flat Blog</Menu.Item>
                        {this.props.menus.map((menu, index)=>{
                            return <Menu.Item key={index} onClick={()=>{window.location.href = menu[0]}} >{menu[1]}</Menu.Item>
                        })}
                    </Container>
                </Menu>
            </Visibility>

        );
    }
}