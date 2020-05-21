import React, { Component } from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import "../../assets/fomantic/dist/semantic.css";

export default class Error404 extends Component {
    render() {
        return <Container textAlign="center" style={{marginTop: "10rem"}}>
            <Icon name="exclamation triangle" size="massive"/>
            <br/>
            <Header as={"h1"}>Page Not Found!</Header>
            <br/>
            <Button primary onClick={()=>{this.props.history.goBack()}}>Go Back</Button>
        </Container>
    }
}