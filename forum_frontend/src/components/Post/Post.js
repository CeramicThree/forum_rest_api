import React, { Component } from 'react';
import {
    Card, CardText, CardBody, CardSubtitle,
    CardTitle,
    Button
} from 'reactstrap';

class Post extends Component{

    render() {
        return(
            <Card id={this.props.ident} className="col-5 mx-3 my-3">
            <CardBody>
                <CardTitle tag="h4">{this.props.header}</CardTitle>
                <CardText tag="h6">{this.props.text}</CardText>
                <CardSubtitle tag="h7" className="text-muted">Автор: {this.props.user.login}</CardSubtitle>
                <Button className="mt-3" color="primary" style={{float: "right"}}>Open</Button>
            </CardBody>
            </Card>
        )
    }

}

export default Post;