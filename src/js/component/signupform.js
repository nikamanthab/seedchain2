import React from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import './../../css/login.css';

class Signupform extends React.Component{
    state={
        email:"",
        password:"",
        isFarmer:false,
        phone: ""
    }

    handleEmailChange = (e)=>{
        this.setState({
            email:e.target.value
        })
    }

    handlePasswordChange = (e)=>{
        this.setState({
            password:e.target.value
        })
    }

    handleInputChange = (e)=>{
        console.log(e.target.id);
        if(e.target.id === "email"){
            this.setState({
                email: e.target.value
            })
        }
        else if(e.target.id === "password"){
            this.setState({
                password: e.target.value
            })
        }
        else if(e.target.id === "phone"){
            this.setState({
                phone: parseInt(e.target.value) || ""
            })
        }
        else if(e.target.id === "isFarmer"){
            this.setState({
                isFarmer: e.target.checked
            })
        }
    }

    handleSubmit =()=>{
        console.log(this.state)
        let s = this.state;
        if(this.props.type==="register"){
            this.props.submitform(s.email,s.password,s.phone,s.isFarmer);
        }
        else if(this.props.type==="login"){
            this.props.submitform(s.email,s.password);
        }
    }

    

    render = () => {


        let contentdiv = (
            <div></div>
        )
    
        if(this.props.type === "register"){
            contentdiv = (
                <div>
                    <Form>
                            <Form.Field>
                                <label>Email</label>
                                <div className="padding2">
                                    <input id="email" onChange={this.handleInputChange} value={this.state.email} placeholder='email'/>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <div className="padding2">
                                    <input id="password" onChange={this.handleInputChange} value={this.state.password} type="password" placeholder='password'/>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>PhoneNumber</label>
                                <div className="padding2">
                                    <input id="phone" onChange={this.handleInputChange} value={this.state.phone} type="text" placeholder='phone'/>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>isFarmer</label>
                                <div className="padding2">
                                    <Checkbox id="isFarmer" onChange={this.handleInputChange} checked={this.state.isFarmer}/>
                                </div>
                            </Form.Field>
    
                            <Button color="green" onClick={this.handleSubmit} type='submit'>Submit</Button>
                        </Form>
                </div>
            )
        }
        else if(this.props.type === "login"){
            contentdiv =(<div>
                <Form>
                            <Form.Field>
                                <label>Email</label>
                                <div className="padding2">
                                    <input id="email" onChange={this.handleInputChange} value={this.state.email} placeholder='email'/>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <div className="padding2">
                                    <input id="password" onChange={this.handleInputChange} value={this.state.password} type="password" placeholder='password'/>
                                </div>
                            </Form.Field>
    
                            <Button color="green" onClick={this.handleSubmit} type='submit'>Submit</Button>
                        </Form>
            </div>)
        }

        return (
            <div>
                {contentdiv}
            </div>

        )
    }
}

export default Signupform;