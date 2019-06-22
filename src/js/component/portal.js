import React from 'react';
import {Button, Grid} from 'semantic-ui-react';
import ItemCard from './../component/itemcard';

class Portal extends React.Component {

    state = {
        started: false,
        isSeller: true
    }

    render() {

        
        let batchbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length > 1) {
            batchbtn = (
                <Button color="yellow" onClick={this.props.handleBatch}>Batch</Button>
            )
        } else {
            batchbtn = (
                <Button color="yellow" disabled>Batch</Button>
            )
        }

        //preparing the sell btn
        let sellbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length >= 1) {
            sellbtn = (
                <Button color="green" onClick={this.props.handleSell}>Sell</Button>
            )
        } else {
            sellbtn = (
                <Button color="green" disabled>Sell</Button>
            )
        }

        //preparing the unbatch btn
        let unbatchbtn = (
            <div></div>
        )
        if (this.props.selectedItems.length === 1) {
            unbatchbtn = (
                <Button color="red" onClick={this.props.handleUnbatch}>Unbatch</Button>
            )
        } else {
            unbatchbtn = (
                <Button color="red" disabled>Unbatch</Button>
            )
        }

        //populate the cards
        let cards = (
            <div></div>
        )
        cards = this
            .props
            .selectedItems
            .map((i) => {
                return (
                    <div
                        // className="item-card"
                        style={{
                        margin: "10px"
                    }}>
                        <ItemCard item={i}/>
                    </div>
                )
            })

        let content = (
            <div></div>
        )
        if (this.state.isSeller) {
            content = (
                <div>
                    <div className="padding">
                        <Grid>
                            <Grid.Row col={3}>
                                <Grid.Column width={5}>{batchbtn}</Grid.Column>
                                <Grid.Column width={5}>{sellbtn}</Grid.Column>
                                <Grid.Column width={5}>{unbatchbtn}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="flex-div">
                        {cards}
                    </div>
                </div>
            )
        } else {
            content = (
                <div>
                    <Button primary onClick={this.props.handleConfirm}>Confirm</Button>
                    <div className="flex-div overflow-div">
                        {cards}
                    </div>
                </div>
            )
        }

        return (
            <div className="height-max">
                <h3>Portal</h3>
                {content}
            </div>
        )
    }
}

export default Portal;