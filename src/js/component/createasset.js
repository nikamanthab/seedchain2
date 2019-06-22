import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {getAllItems, generateItems, generateQr} from './../../apiservices/api';

class CreateAsset extends React.Component {
    state = {
        name: "",
        count: "",
        weight: 0,
        exp:0
    }

    handleInputChange = (e) => {
        if (e.target.id === "count") {
            this.setState({count: e.target.value})
        } else if (e.target.id === "name") {
            this.setState({name: e.target.value})
        } else if (e.target.id === "weight") {
            this.setState({weight: e.target.value})
        }
        else if(e.target.id === "exp"){
            this.setState({exp:e.target.value})
        }
    }

    //submit
    handleSubmit = () => {

        getAllItems().then((res) => {
            return res.data.length
        }).then((length) => {
            //qr generation
            return generateQr({urls:[length,parseInt(this.state.count)]})
        }).then((res)=>{

            res.data.files.forEach(x=>{
                window.open("http://localhost:5000/qr/temp/"+x,x);
            })
            return "ok";
        }).then(() => {
            let req = {
                $class: "org.seedchain.resources.AssetGeneration",
                count: this.state.count,
                assetMeta: {
                    $class: "org.seedchain.resources.Assetmeta",
                    name: this.state.name,
                    weight: this.state.weight,
                    transactTime: [],
                    exp: Date.parse(this.state.exp),
                    isPacket: "true",
                    isGrouped: "false"
                }
            };
            return generateItems(req)
        })
        .then((res)=>{
            this.props.populateAllItems();
            this.props.onCloseModal();
        })
        .catch(err=>console.log(err));
    }

    render = () => {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Count:</label>
                        <Input
                            type="number"
                            id="count"
                            onChange={this.handleInputChange}
                            value={this.state.count}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Name:</label>
                        <Input
                            type="text"
                            id="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Weight:</label>
                        <Input
                            type="number"
                            id="weight"
                            onChange={this.handleInputChange}
                            value={this.state.weight}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Expiry:</label>
                        <Input
                            type="date"
                            id="exp"
                            onChange={this.handleInputChange}
                            value={this.state.exp}/>
                    </Form.Field>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default CreateAsset