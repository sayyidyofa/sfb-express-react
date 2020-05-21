import React, { Component } from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import "../../assets/fomantic/dist/semantic.css";

export default class Error401 extends Component {
    render() {
        return <Container textAlign="center" style={{marginTop: "10rem"}}>
            <Icon name="lock" size="massive"/>
            <br/>
            <p>This incident will be reported</p>
            <Header as={"h1"}>You are not authorized to do this action</Header>
            <br/>
            <Button primary onClick={()=>{this.props.history.goBack()}}>Go Back</Button>
        </Container>
    }
}