import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, Form} from 'reactstrap';
import AppNav from '../AppNav/AppNav';

class AddPost extends Component{
    async handleSubmit(){
        
    }

    render(){
        return(
            <div>
                <AppNav/>
                <div className="container mt-4" style={{width : "35%"}}>
                    <h3 className="text-center mb-4">Adding post</h3>
                    <Form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <Label tag="h5" for = "header">Header</Label>
                            <Input type = "text" name = "header" id = "header"/>
                        </FormGroup>
                        <FormGroup>
                            <Label tag="h5" for = "text">Text</Label>
                            <Input type = "textarea" name = "text" id = "text" style={{height : "25vh"}}/>
                        </FormGroup>
                        <Button type="submit" className="btn-lg text-center" color="success">Add</Button>
                    </Form>
                    </div>
            </div>
            
        )
    }
}

export default AddPost;