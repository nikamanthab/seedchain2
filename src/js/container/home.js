import React from 'react';
import {Grid} from 'semantic-ui-react';
import Inventry from './../component/inventry';
import Portal from './../component/portal';
import './../../css/home.css';

class Home extends React.Component {

    state = {
        allItems: [],
        selectedItems: [],
        buyer: ""
    }

    componentDidMount = () => {
        this.setState({
            allItems: [
                {
                    itemid: "ASSET1",
                    name: "watermelon",
                    weight: 100,
                    exp: 1234,
                    mfd: 1234,
                    isPacket: true,
                    isGrouped: true
                }, {
                    itemid: "ASSET2",
                    name: "appleseeds",
                    weight: 50,
                    exp: 1234,
                    mfd: 1234,
                    isPacket: false,
                    isGrouped: false
                }
            ],
            buyer: "mohan@madstreetden.com",
            selected: ["ASSET1"]

        })
    }

    //scan handlers
    startScan = ()=>{
        console.log("started scanning");
    }

    stopScan = ()=>{
        console.log("scanning stoped");
    }


    //portal btn handlers
    handleBatch = ()=>{
        console.log("handle batch...")
    }

    handleSell = ()=>{
        console.log("handle sell...");
    }

    handleUnbatch = ()=>{
        console.log("handle unbatch...")
    }

    confirmHandler = ()=>{
        console.log("handle confirm...x")
    }




    render = () => {

        let selectedItems = [];
        let unselectedItems = [];
        this
            .state
            .allItems
            .forEach((ele) => {
                if (!this.state.selected.includes(ele.itemid)) {
                    unselectedItems.push(ele);
                }
                else{
                    selectedItems.push(ele);
                }
            })

        console.log("selected items:", selectedItems);
        console.log("all items:", this.state.allItems);

        return (
            <div>
                <Grid>
                    <Grid.Row col={2}>
                        <Grid.Column width={8}>
                            <div className="main-containers">
                                <Inventry 
                                    allItems={unselectedItems}
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="main-containers">

                                <Portal 
                                    confirmHandler={this.confirmHandler}
                                    selectedItems={selectedItems}
                                    startScan = {this.startScan}
                                    stopScan = {this.stopScan}
                                    handleBatch={this.handleBatch}
                                    handleSell={this.handleSell}
                                    handleUnbatch={this.handleUnbatch}
                                />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Home;