import React from 'react';
import {Grid} from 'semantic-ui-react';
import Inventry from './../component/inventry';
import Portal from './../component/portal';
import './../../css/home.css';
import Modal from 'react-responsive-modal';
import CreateAsset from './../component/createasset';
import {getAllItems, sellItem, batchItems} from './../../apiservices/api';
import openSocket from 'socket.io-client';
import {Input} from 'semantic-ui-react';

class Home extends React.Component {

    state = {
        open: false,
        allItems: [],
        selectedItems: [],
        buyer: "",
        batchmodal: false,
        batchname:""
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
                allItems: userItemsArray    
            })
        })
    } 

    componentDidMount = () => {
        var socket = openSocket('http://192.168.137.97:5000/');
        socket.on('connect',()=>{
            console.log("connected");
            socket.emit("idInject",localStorage.getItem("seeduser"));
            socket.on('buyer',(mail)=>{
                console.log(mail);
                this.setState({buyer : mail});
            })
            socket.on('product',(itemid)=>{
                console.log(itemid);
                let selectedItems = [];
                let unselectedItems = [];
                this
            .state
            .allItems
            .forEach((ele) => {
                if (!this.state.selectedItems.includes(ele.itemid)) {
                    unselectedItems.push(ele);
                } else {
                    selectedItems.push(ele);
                }
            })

            console.log(selectedItems);
            console.log(unselectedItems);

            let keys = [];
            unselectedItems.forEach((unsel)=>{
                if(unsel.itemid === itemid){
                    keys.push(itemid);
                }
            })

            console.log(keys);
            if(keys.length === 0){
                alert("item not available")
            }
            else{
                    console.log("inside else")
                    this.setState({selectedItems:this.state.selectedItems.concat(keys)});
                }
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
    handleBatchNameChange = (e)=>{
        this.setState({
            batchname:e.target.value
        })
    }

    batchModalClose = ()=>{
        this.setState({
            batchmode: false
        })
    }

    openBatchSelect = ()=>{
        this.setState({
            batchmodal: true
        })
    }

    handleBatch = () => {
        this.openBatchSelect()
        console.log("handle batch...")
        let obj = {
            $class: "org.seedchain.resources.BatchingBox",
            owner: localStorage.getItem("seeduser"),
            items: this.state.selectedItems,
            name: this.state.batchname,
          }
        batchItems(obj).then(()=>{
            console.log("boom")
            this.populateAllItems();
        })
    }

    handleSell = () => {
        console.log("handle sell...");
        let promises = [];
        this.state.selectedItems.forEach((sel,i)=>{
            promises.push(sellItem({
                $class: "org.seedchain.resources.Sell",
                buyer: this.state.buyer,
                item: sel,
              }))
        })
        Promise.all(promises).then((res)=>{
            console.log("sold all...")
            this.populateAllItems();
        })

    }

    handleUnbatch = () => {
        console.log("handle unbatch...")
    }

    confirmHandler = () => {
        console.log("handle confirm...")
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
                if (!this.state.selectedItems.includes(ele.itemid)) {
                    unselectedItems.push(ele);
                } else {
                    selectedItems.push(ele);
                }
            })


        return (
            <div style={{backgroundColor:"#50C878"}}>
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

                <Modal open={this.state.batchmodal} onClose={this.batchModalClose} center>
                    <Input type="text" value={this.state.batchname} onChange={this.handleBatchNameChange}/>
                </Modal>
            </div>
        )
    }
}

export default Home;