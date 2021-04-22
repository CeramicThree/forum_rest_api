import React, { Component } from 'react';
import {
    Card, CardText, CardBody, CardSubtitle,
    CardTitle, CardImg,
    Button
} from 'reactstrap';

class Post extends Component{

    render() {
        return(
            <div className="col-5 mx-3 my-3">
            <Card id={this.props.ident} >
            <CardImg top width="100%" src="https://reactstrap.github.io/assets/318x180.svg" alt="Card image cap" />
            <CardBody style={{position: "relative"}}>
                <CardTitle tag="h4">{this.props.header}</CardTitle>
                <CardText tag="h6">{this.props.text}</CardText>
                <CardSubtitle tag="p" className="text-muted mb-4" style={{bottom: "0", position: "absolute"}}>Автор: {this.props.user.login}</CardSubtitle>
                <Button className="mt-3" color="primary" style={{float: "right"}}>Open</Button>
            </CardBody>
            </Card>
            </div>
        )
    }

}

export default Post;