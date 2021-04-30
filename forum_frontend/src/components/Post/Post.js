import React, { Component } from 'react';
import {
    Card, CardText, CardBody, CardSubtitle,
    CardTitle, CardImg,
    Button
} from 'reactstrap';

class Post extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.location.replace("/post/" + this.props.ident);
    }

    render() {
        return(
            <div className="col-5 mx-3 my-3">
            <Card id={this.props.ident} >
            <CardImg top width="100%" src={this.props.imageUrl} alt="Card image cap" style={{width: '318 px', height: '180 px', backgroundSize: 'cover'}} />
            <CardBody style={{position: "relative"}}>
                <CardTitle tag="h4">{this.props.header}</CardTitle>
                <CardText tag="h6">{this.props.text}</CardText>
                <CardSubtitle tag="p" className="text-muted mb-4" style={{bottom: "0", position: "absolute"}}>Автор: {this.props.user.login}</CardSubtitle>
                <Button className="mt-3" color="primary" style={{float: "right"}} onClick={this.handleClick}>Open</Button>
            </CardBody>
            </Card>
            </div>
        )
    }

}

export default Post;