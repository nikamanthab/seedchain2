import React from 'react';
import {Grid} from 'semantic-ui-react';
import Inventry from './../component/inventry';
import Portal from './../component/portal';
import './../../css/home.css';
import Modal from 'react-responsive-modal';
import CreateAsset from './../component/createasset';
import {getAllItems} from './../../apiservices/api';
import openSocket from 'socket.io-client';

class Home extends React.Component {

    state = {
        open: false,
        allItems: [],
        selectedItems: [],
        buyer: ""
    }

    populateAllItems = ()=>{
        getAllItems().then((res)=>{
            let userItemsArray = [];
            let resarray = res["data"];
            res["data"].forEach((ele)=>{
                let obj = {
                    itemid: ele.itemId,
                    name: ele.assetMeta.name,
                    weight: ele.assetMeta.weight,
                    exp: ele.assetMeta.exp,
                    mfd: ele.assetMeta.transactTime[0],
                    isPacket: ele.assetMeta.isPacket,
                    isGrouped: ele.assetMeta.isGrouped
                }

                if(ele.sellers[ele.sellers.length-1].includes(localStorage.getItem("seeduser"))){
                    console.log("ADDING the ele")
                    userItemsArray.push(obj);
                }
            })
            this.setState({
                allItems: userItemsArray,
                buyer: "mohan@madstreetden.com",
                selected: ["ASSET1"]
    
            })
        })
    } 

    componentDidMount = () => {
        var socket = openSocket('http://localhost:5000/');
        socket.on('connect',()=>{
            console.log("connected");
            socket.emit("idInject",localStorage.getItem("seeduser"));
            socket.on('buyer',(mail)=>{
                console.log(mail);
                this.setState({buyer : mail});
            })
            socket.on('product',(itemid)=>{
                console.log(itemid);
                this.setState({selectedItems:this.state.selectedItems.concat([itemid])});
                this.populateAllItems();
            })
        })
        this.populateAllItems();

    }

    //scan handlers
    startScan = () => {
        console.log("started scanning");
    }

    stopScan = () => {
        console.log("scanning stoped");
    }

    //portal btn handlers
    handleBatch = () => {
        console.log("handle batch...")
    }

    handleSell = () => {
        console.log("handle sell...");
    }

    handleUnbatch = () => {
        console.log("handle unbatch...")
    }

    confirmHandler = () => {
        console.log("handle confirm...x")
    }

    //handle modal
    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    render = () => {

        let selectedItems = [];
        let unselectedItems = [];
        this
            .state
            .allItems
            .forEach((ele) => {
                if (!this.state.selected.includes(ele.itemid)) {
                    unselectedItems.push(ele);
                } else {
                    selectedItems.push(ele);
                }
            })


        return (
            <div>
                <Grid>
                    <Grid.Row col={2}>
                        <Grid.Column width={8}>
                            <div className="main-containers">
                                <Inventry 
                                onOpenModal={this.onOpenModal}
                                allItems={unselectedItems}/>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="main-containers">

                                <Portal
                                    confirmHandler={this.confirmHandler}
                                    selectedItems={selectedItems}
                                    startScan={this.startScan}
                                    stopScan={this.stopScan}
                                    handleBatch={this.handleBatch}
                                    handleSell={this.handleSell}
                                    handleUnbatch={this.handleUnbatch}/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Create Asset</h2>
                    
                    <CreateAsset populateAllItems={this.populateAllItems} onCloseModal={this.onCloseModal}/>
                </Modal>
            </div>
        )
    }
}

export default Home;