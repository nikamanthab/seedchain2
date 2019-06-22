import React from 'react';
import {Grid} from 'semantic-ui-react';
import {navigate} from '@reach/router';
import Signupform from '../component/signupform';
import './../../css/login.css';

class Login extends React.Component {

    signup = (email, password, phone, isFarmer) => {
        //signup - server request
        console.log(password);

        localStorage.setItem("seeduser", email);
        // navigate("/home")
    }

    login = (email, password) => {
        //login - server data verification
        if(email.includes('gov')){
            localStorage.setItem("seeduser", email);
            navigate("/govhome");    
        }
        localStorage.setItem("seeduser", email);
        navigate("/home");
    }

    render() {
        return (
            <div className="padding">
                <Grid>
                    <Grid.Row col={2}>
                        <Grid.Column width={8}>
                            <div className="gray-background box-shadow padding2">
                                <h3>Signup</h3>
                                <Signupform
                                    type="register"
                                    submitform={this.signup}
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="gray-background box-shadow padding2">
                                <h3>LogIn</h3>
                                <Signupform
                                    type="login"
                                    submitform={this.login}
                                />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

export default Login;