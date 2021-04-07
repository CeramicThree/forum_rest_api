import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, Form} from 'reactstrap';
import AppNav from '../AppNav/AppNav';

class AddPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: '',
            text: '',
            date: '',
            author: {
                id: ''
            }
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    async handleSubmit(event){
        this.setState({author: {id:'4'}})
        await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }.then(function(response) {
        console.log(response)
        return response.json();
        });
                    
        event.preventDefault();      
    }
    
    
    handleChange(event) {
        this.setState({event.target.name : event.target.value});  
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
                            <Input type = "text" name = "header" id = "header" onChange = {this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label tag="h5" for = "text">Text</Label>
                            <Input type = "textarea" name = "text" id = "text" style={{height : "25vh"}} onChange = {this.handleChange}/>
                        </FormGroup>
                        <Button type="submit" className="btn-lg text-center" color="success">Add</Button>
                    </Form>
                    </div>
            </div>
            
        )
    }
}

export default AddPost;
