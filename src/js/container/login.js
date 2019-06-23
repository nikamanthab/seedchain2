import React from 'react';
import {Grid} from 'semantic-ui-react';
import {navigate} from '@reach/router';
import Signupform from '../component/signupform';
import './../../css/login.css';
import Logo from '../../images/fertilizer.png';
import {setUser, getuser, getUser, generateUserQr} from './../../apiservices/api';
import Modal from 'react-responsive-modal';
import {Loader} from 'semantic-ui-react';

class Login extends React.Component {

    state = {
        open: false,
      };
     
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

    signup = (email, password, phone, isFarmer) => {
        this.onOpenModal();
        console.log("inside signup");
        //signup - server request
        generateUserQr({email:email})
        .then((res)=>{
            alert(res.data);

            this.onCloseModal();
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
            navigate("/home")
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
            <div className="padding" style={{backgroundColor:'#50C878'}}>
                <div className="primaryF content extra" style={{color:'white',textAlign:'center'}}>
                    <img style={{width:'40px'}} src={Logo}></img> 
                    <a style={{color:'white',paddingBottom : '10px'}}>  SeedChain</a>
                </div>
                <Grid style={{backgroundColor:"#50C878", borderRadius: '10px', padding : '10px'}}>
                    <Grid.Row col={2}>
                        <Grid.Column width={8}>
                            <div className="gray-background"
                            style={{borderRadius:'10px', margin : '20px'}}
                            >
                                <h3 className="primaryF" style={{marginTop : '20px',padding:'10px'}}>Signup</h3>
                                <Signupform
                                    type="register"
                                    submitform={this.signup}
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="gray-background"
                            style={{borderRadius: '10px', padding : '10px',marginTop : '20px',height:'380px'}}>
                                <h3 className="primaryF" style={{marginRight:'10px',marginTop : '80px'}}>Login</h3>
                                <Signupform
                                    type="login"
                                    submitform={this.login}
                                />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div style={{padding:"50px"}}>
                        <Loader active inline />
                    </div>
                </Modal>
                

            </div>
        )
    }

}

export default Login;