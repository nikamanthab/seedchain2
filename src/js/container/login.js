import React from 'react';
import {Grid} from 'semantic-ui-react';
import {navigate} from '@reach/router';
import Signupform from '../component/signupform';
import './../../css/login.css';
import {setUser, getuser, getUser, generateUserQr} from './../../apiservices/api';

class Login extends React.Component {

    signup = (email, password, phone, isFarmer) => {
        console.log("inside signup");
        //signup - server request
        generateUserQr({email:email})
        .then((res)=>{
            let obj = {
                $class: "org.seedchain.resources.Seller",
                email: email,
                name: email.split("@")[0],
                password: password,
                phone: phone,
                isFarmer: isFarmer,
                qrcode:res.data
              }
              console.log(obj)
            return setUser(obj)
        }
        ).then((res)=>{
            console.log(res);
            localStorage.setItem("seeduser", email);
            // navigate("/home")
          })
    }

    login = (email, password) => {
        //login - server data verification
        getUser(email)
        .then((res)=>{
            let pass = res["data"]["password"];
            if(pass === password){
                console.log(res);
                localStorage.setItem("seeduser", email);
                navigate("/home");
            }
        })
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