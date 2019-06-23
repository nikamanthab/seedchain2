import React from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react';
import './../../css/login.css';

class Signupform extends React.Component {
    state = {
        email: "",
        password: "",
        isFarmer: false,
        phone: ""
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    handleInputChange = (e) => {
        console.log(e.target.id);
        if (e.target.id === "email") {
            this.setState({email: e.target.value})
        } else if (e.target.id === "password") {
            this.setState({password: e.target.value})
        } else if (e.target.id === "phone") {
            this.setState({
                phone: parseInt(e.target.value) || ""
            })
        } else if (e.target.id === "isFarmer") {
            this.setState({isFarmer: e.target.checked})
        }
    }

    handleSubmit = () => {
        console.log(this.state)
        let s = this.state;
        if (this.props.type === "register") {
            this
                .props
                .submitform(s.email, s.password, s.phone, s.isFarmer);
        } else if (this.props.type === "login") {
            this
                .props
                .submitform(s.email, s.password);
        }
    }

    render = () => {

        let contentdiv = (
            <div></div>
        )

        if (this.props.type === "register") {
            contentdiv = (
                <div
                    style={{
                    textAlign: 'left',
                    margin: '50px'
                }}>
                    <Form.Field>
                        <Form.Field>
                            <div className="padding2 ui divided list">
                                <label className="ui label small grey">
                                    <strong>Email</strong>
                                </label>
                                <input
                                    id="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                    placeholder=''
                                    className="ui input large"
                                    style={{
                                    borderRadius: '5px',
                                    marginLeft: '60px'
                                }}/>
                            </div>
                        </Form.Field>
                        <div className="padding2 ui divided list">
                            <label className="ui label small grey">
                                <strong>Password</strong>
                            </label>
                            <input
                                id="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                type="password"
                                placeholder=''
                                className="ui input large"
                                style={{
                                borderRadius: '5px',
                                marginLeft: '40px'
                            }}/>
                        </div>
                        <div className="padding2 ui divided list">
                            <label className="ui label small grey">
                                <strong>PhoneNumber</strong>
                            </label>
                            <input
                                id="phone"
                                onChange={this.handleInputChange}
                                value={this.state.phone}
                                type="text"
                                placeholder=''
                                className="ui input large"
                                style={{
                                borderRadius: '5px',
                                marginLeft: '15px'
                            }}/>
                        </div>
                        <div
                            className="padding2 ui divided list"
                            style={{
                            textAlign: 'center'
                        }}>
                            <label className="ui label small grey">Farmer</label>
                            <div className="padding2">
                                <Checkbox
                                    id="isFarmer"
                                    onChange={this.handleInputChange}
                                    checked={this.state.isFarmer}/>
                            </div>
                        </div>

                        <Button
                            color="green"
                            onClick={this.handleSubmit}
                            type='submit'
                            style={{
                            marginLeft: "160px",
                            marginBottom: '30px'
                        }}>Submit</Button>
                    </Form.Field>
                </div>
            )
        } else if (this.props.type === "login") {
            contentdiv = (
                <div
                    style={{
                    textAlign: 'left',
                    margin: '50px'
                }}>
                    <Form.Field>
                        <div className="padding2 ui divided list">
                            <label className="ui label small grey">Email</label>
                            <input
                                id="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                placeholder=''
                                className="ui input large"
                                style={{
                                borderRadius: '5px',
                                marginLeft: '70px'
                            }}/>
                        </div>
                        <div className="padding2 ui divided list">
                            <label className="ui label small grey">Password</label>
                                <input
                                    id="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    type="password"
                                    placeholder=''
                                    className="ui input large"
                                    style={{
                                    borderRadius: '5px',
                                    marginLeft: '50px'
                                }}/>
                        </div>
                        <Button
                            color="green"
                            onClick={this.handleSubmit}
                            type='submit'
                            style={{
                            marginLeft: "170px",
                            marginTop:'50'
                        }}>Submit</Button>
                    </Form.Field>
                </div>
            )
        }

        return (
            <div>
                {contentdiv}
            </div>

        )
    }
}

export default Signupform;