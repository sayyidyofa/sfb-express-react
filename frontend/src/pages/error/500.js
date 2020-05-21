import React, { Component } from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import "../../assets/fomantic/dist/semantic.css";

export default class Error500 extends Component {
    render() {
        return <Container textAlign="center" style={{marginTop: "10rem"}}>
            <Icon name="bug" size="massive"/>
            <br/>
            <p>What have you done?</p>
            <Header as={"h1"}>Server Error!</Header>
            <br/>
            <Button primary onClick={()=>{this.props.history.goBack()}}>Go Back</Button>
        </Container>
    }
}